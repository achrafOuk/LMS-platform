import { and, eq } from "drizzle-orm";
import type { Db } from "../../db/drizzle.client";
import { courses, enrollments, payments } from "../../db/schemas";

export async function getCourseForCheckout(courseId: string, db: Db) {
  const [course] = await db
    .select({
      cid: courses.cid,
      slug: courses.slug,
      courseName: courses.courseName,
      price: courses.price,
    })
    .from(courses)
    .where(eq(courses.cid, courseId))
    .limit(1);

  return course;
}

export async function getPayment(uid: string, cid: string, db: Db) {
  const [payment] = await db
    .select()
    .from(payments)
    .where(and(eq(payments.uid, uid), eq(payments.cid, cid)))
    .limit(1);

  return payment;
}

export async function getSuccessfulPayment(uid: string, cid: string, db: Db) {
  const [payment] = await db
    .select()
    .from(payments)
    .where(
      and(
        eq(payments.uid, uid),
        eq(payments.cid, cid),
        eq(payments.status, "SUCCESS"),
      ),
    )
    .limit(1);

  return payment;
}

export async function getPaymentBySessionId(sessionId: string, db: Db) {
  const [payment] = await db
    .select()
    .from(payments)
    .where(eq(payments.stripe_checkout_session_id, sessionId))
    .limit(1);

  return payment;
}

export async function createPendingPayment(
  {
    uid,
    cid,
    amount,
    currency,
    idempotencyKey,
  }: {
    uid: string;
    cid: string;
    amount: number;
    currency: string;
    idempotencyKey: string;
  },
  db: Db,
) {
  const [payment] = await db
    .insert(payments)
    .values({
      uid,
      cid,
      amount,
      currency,
      idempotencyKey,
      status: "PENDING",
      response_data: {},
    })
    .onConflictDoNothing()
    .returning();

  if (payment) {
    return payment;
  }

  return getPayment(uid, cid, db);
}

export async function updatePaymentSession(
  uid: string,
  cid: string,
  {
    sessionId,
    paymentIntentId,
    idempotencyKey,
    responseData,
  }: {
    sessionId: string;
    paymentIntentId?: string | null;
    idempotencyKey?: string;
    responseData?: unknown;
  },
  db: Db,
) {
  const [payment] = await db
    .update(payments)
    .set({
      stripe_checkout_session_id: sessionId,
      ...(paymentIntentId !== undefined
        ? { stripe_payment_intent_id: paymentIntentId }
        : {}),
      ...(idempotencyKey ? { idempotencyKey } : {}),
      ...(responseData !== undefined ? { response_data: responseData } : {}),
      status: "PENDING",
    })
    .where(and(eq(payments.uid, uid), eq(payments.cid, cid)))
    .returning();

  return payment;
}

export async function markPaymentSuccess(
  uid: string,
  cid: string,
  responseData: unknown,
  db: Db,
  paymentIntentId?: string | null,
) {
  const [payment] = await db
    .update(payments)
    .set({
      status: "SUCCESS",
      response_data: responseData,
      ...(paymentIntentId
        ? { stripe_payment_intent_id: paymentIntentId }
        : {}),
    })
    .where(and(eq(payments.uid, uid), eq(payments.cid, cid)))
    .returning();

  return payment;
}

export async function ensureEnrollment(uid: string, cid: string, db: Db) {
  await db
    .insert(enrollments)
    .values({
      uid,
      cid,
      progressPercent: 0,
      enrolledAt: new Date().toISOString(),
    })
    .onConflictDoNothing();
}
