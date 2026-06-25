import { loginRoute, logoutRoute, meRoute, registerRoute } from "./auth/auth.routes";
import { createCourseRoute, getCourseRoute, getCoursesRoute, updateCourseRoute } from "./courses/course.route";
import { getMediaUrlRoute, getPresignedUrlRoute, notifyMediaUploadedRoute } from "./media/media.route";


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
    updateCourse: updateCourseRoute,
  },

  media: {
    getPresignedUrl: getPresignedUrlRoute,
    getMediaUrl: getMediaUrlRoute,
    notifyMediaUploaded: notifyMediaUploadedRoute,
  },

};



export type AppRouter = typeof router;


