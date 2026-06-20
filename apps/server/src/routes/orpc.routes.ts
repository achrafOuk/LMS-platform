import { loginRoute, logoutRoute, meRoute, registerRoute } from "./auth/auth.routes";
import { createCourseRoute, getCourseRoute, getCoursesRoute } from "./courses/course.route";


export const router = {

  auth: {

    login: loginRoute,

    register: registerRoute,

    logout: logoutRoute,

    me: meRoute,
  },

  courses: {
    createCourse: createCourseRoute,
    getFeaturedCourses: getCoursesRoute,
    getCourse: getCourseRoute,
  },

};



export type AppRouter = typeof router;


