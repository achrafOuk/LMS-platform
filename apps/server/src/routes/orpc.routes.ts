import { os } from "@orpc/server";

export const router = {
    "hello": os
    .handler(async () => {
        return `Hello, world!`;
    }),
} 

export type Router = typeof router;