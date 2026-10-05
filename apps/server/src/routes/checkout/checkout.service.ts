import { ORPCError } from "@orpc/server";
import { ulid } from "ulid";
import type Stripe from "stripe";
import type { Db } from "../../db/drizzle.client";
import { getClientOrigin, getStripe } from "../../payments/stripe.client";
import { isUserEnrolledInCourse } from "../enroll/enroll.repository";
import {
  createPendingPayment,
  ensureEnrollment,
  getCourseForCheckout,
  getPayment,
  getPaymentBySessionId,
  markPaymentSuccess,
  updatePaymentSession,
} from "./checkout.repository";

function toCents(price: number) {
  return Math.round(price * 100);
}

function paymentIntentIdFromSession(session: Stripe.Checkout.Session) {
  const paymentIntent = session.payment_intent;
  if (!paymentIntent) return null;
  return typeof paymentIntent === "string" ? paymentIntent : paymentIntent.id;
}

async function fulfillPaidSession(
  session: Stripe.Checkout.Session,
  userId: string,
  courseId: string,
  db: Db,
) {
  await markPaymentSuccess(
    userId,
    courseId,
    session,
    db,
    paymentIntentIdFromSession(session),
  );
  await ensureEnrollment(userId, courseId, db);
}

export async function createCheckoutSessionService(
  userId: string,
  courseId: string,
  db: Db,
) {
  const course = await getCourseForCheckout(courseId, db);
  if (!course) {
    throw new ORPCError("NOT_FOUND", { message: "Course not found" });
  }

  const enrolled = await isUserEnrolledInCourse(userId, course.cid, db);
  if (enrolled) {
    throw new ORPCError("CONFLICT", {
      message: "User already enrolled in the course",
    });
  }

  if (course.price <= 0) {
    await ensureEnrollment(userId, course.cid, db);
    return {
      type: "enrolled" as const,
      courseSlug: course.slug,
    };
  }

  const amount = toCents(course.price);
  const currency = "usd";
  const stripe = getStripe();
  const clientOrigin = getClientOrigin();

  let payment = await getPayment(userId, course.cid, db);

  if (payment?.status === "SUCCESS") {
    await ensureEnrollment(userId, course.cid, db);
    return {
      type: "enrolled" as const,
      courseSlug: course.slug,
    };
  }

  if (!payment) {
    payment = await createPendingPayment(
      {
        uid: userId,
        cid: course.cid,
        amount,
        currency,
        idempotencyKey: `checkout:${userId}:${course.cid}`,
      },
      db,
    );
  }

  if (!payment) {
    throw new ORPCError("INTERNAL_SERVER_ERROR", {
      message: "Failed to create payment record",
    });
  }

  if (payment.stripe_checkout_session_id) {
    const existingSession = await stripe.checkout.sessions.retrieve(
      payment.stripe_checkout_session_id,
    );

    if (existingSession.status === "open" && existingSession.url) {
      return {
        type: "checkout" as const,
        checkoutUrl: existingSession.url,
      };
    }
  }

  const needsNewIdempotencyKey = Boolean(payment.stripe_checkout_session_id);
  const idempotencyKey = needsNewIdempotencyKey
    ? `checkout:${userId}:${course.cid}:${ulid()}`
    : payment.idempotencyKey;

  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: amount,
            product_data: {
              name: course.courseName,
            },
          },
        },
      ],
      metadata: {
        userId,
        courseId: course.cid,
        courseSlug: course.slug,
      },
      success_url: `${clientOrigin}/dashboard/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientOrigin}/dashboard/checkout/cancel?course=${encodeURIComponent(course.slug)}`,
    },
    { idempotencyKey },
  );

  if (!session.url) {
    throw new ORPCError("INTERNAL_SERVER_ERROR", {
      message: "Stripe did not return a checkout URL",
    });
  }

  await updatePaymentSession(
    userId,
    course.cid,
    {
      sessionId: session.id,
      paymentIntentId: paymentIntentIdFromSession(session),
      idempotencyKey,
      responseData: session,
    },
    db,
  );

  return {
    type: "checkout" as const,
    checkoutUrl: session.url,
  };
}

export async function confirmCheckoutSessionService(
  userId: string,
  sessionId: string,
  db: Db,
) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const metadataUserId = session.metadata?.userId;
  const metadataCourseId = session.metadata?.courseId;
  const courseSlug = session.metadata?.courseSlug;

  if (!metadataUserId || !metadataCourseId) {
    throw new ORPCError("BAD_REQUEST", {
      message: "Checkout session is missing course metadata",
    });
  }

  if (metadataUserId !== userId) {
    throw new ORPCError("FORBIDDEN", {
      message: "Checkout session does not belong to this user",
    });
  }

  if (session.payment_status !== "paid") {
    throw new ORPCError("BAD_REQUEST", {
      message: "Payment has not been completed",
    });
  }

  const payment =
    (await getPaymentBySessionId(sessionId, db)) ??
    (await getPayment(userId, metadataCourseId, db));

  if (!payment) {
    await createPendingPayment(
      {
        uid: userId,
        cid: metadataCourseId,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        idempotencyKey: `checkout:${userId}:${metadataCourseId}:confirm`,
      },
      db,
    );
    await updatePaymentSession(
      userId,
      metadataCourseId,
      {
        sessionId: session.id,
        paymentIntentId: paymentIntentIdFromSession(session),
        responseData: session,
      },
      db,
    );
  }

  await fulfillPaidSession(session, userId, metadataCourseId, db);

  const course =
    courseSlug ??
    (await getCourseForCheckout(metadataCourseId, db))?.slug ??
    "";

  return {
    enrolled: true as const,
    courseSlug: course,
  };
}

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
  db: Db,
) {
  const userId = session.metadata?.userId;
  const courseId = session.metadata?.courseId;

  if (!userId || !courseId) {
    console.error("Stripe webhook missing metadata", session.id);
    return;
  }

  if (session.payment_status !== "paid") {
    return;
  }

  let payment = await getPaymentBySessionId(session.id, db);
  if (!payment) {
    payment = await getPayment(userId, courseId, db);
  }

  if (!payment) {
    await createPendingPayment(
      {
        uid: userId,
        cid: courseId,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        idempotencyKey: `checkout:${userId}:${courseId}:webhook`,
      },
      db,
    );
    await updatePaymentSession(
      userId,
      courseId,
      {
        sessionId: session.id,
        paymentIntentId: paymentIntentIdFromSession(session),
        responseData: session,
      },
      db,
    );
  }

  await fulfillPaidSession(session, userId, courseId, db);
}
