import { loginRoute, logoutRoute, meRoute, registerRoute } from "./auth/auth.routes";

export const router = {
  auth: {
    login: loginRoute,
    register: registerRoute,
    logout: logoutRoute,
    me: meRoute,
  },
};

export type AppRouter = typeof router;
