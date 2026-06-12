import { loginRoute, registerRoute } from "./auth.routes";



export const router = {
    auth:{
        login: loginRoute,
        register: registerRoute,
    }
} 



export type AppRouter = typeof router;

