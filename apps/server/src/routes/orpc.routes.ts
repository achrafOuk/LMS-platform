import { os } from "@orpc/server";
import { loginRoute } from "./auth.routes";

export const router = {
    auth:{
        login: loginRoute,
    }
} 

export type AppRouter = typeof router;