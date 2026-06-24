import "./env.js";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { RPCHandler } from "@orpc/server/fetch";
import { onError } from "@orpc/server";
import {
  RequestHeadersPlugin,
  ResponseHeadersPlugin,
} from "@orpc/server/plugins";
import { router } from "./routes/orpc.routes";
import { createBucket } from "./media/s3.js";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
    allowMethods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.json({
    message: "Hello from Hono",
  });
});

const handler = new RPCHandler(router, {
  plugins: [new RequestHeadersPlugin(), new ResponseHeadersPlugin()],
  interceptors: [
    onError((error) => {
      if (error instanceof Error && error.cause && typeof error.cause === 'object' && 'issues' in error.cause) {
        console.error(JSON.stringify(error.cause.issues, null, 2))
      }
      console.error(error)
    }),
  ],
});


app.use('/rpc/*', async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/rpc',
    context: {},
  })

  if (matched) {
    return c.newResponse(response.body, response)
  }

  await next()
});

serve(
  {
    fetch: app.fetch,
    port: parseInt(process.env.PORT ?? "3002"),
  },
  (info) => {
    console.log(`Server running on http://localhost:${info.port}`);
  },
);

await createBucket();

export default app;


