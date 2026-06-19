import { loginRoute, logoutRoute, meRoute, registerRoute } from "./auth/auth.routes";
import { createCourseRoute } from "./courses/course.route";



export const router = {

  auth: {

    login: loginRoute,

    register: registerRoute,

    logout: logoutRoute,

    me: meRoute,
  },

  courses: {
    createCourse: createCourseRoute,
  },

};



export type AppRouter = typeof router;


