import { loginRoute, logoutRoute, meRoute, registerRoute } from "./auth/auth.routes";
import { createCourseRoute, getCourseRoute, getCoursesRoute, getMyCoursesRoute, updateCourseRoute } from "./courses/course.route";
import { enrollInCourseRoute, isUserEnrolledInCourseRoute } from "./enroll/enroll.route";
import { getMediaUrlRoute, getPresignedUrlRoute, notifyMediaUploadedRoute, removeMediaRoute } from "./media/media.route";
import { courseStaticRoute } from "./statistics/statistics.route";


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
    getMyCourses: getMyCoursesRoute,
    getCourse: getCourseRoute,
    updateCourse: updateCourseRoute,
  },

  media: {
    getPresignedUrl: getPresignedUrlRoute,
    getMediaUrl: getMediaUrlRoute,
    notifyMediaUploaded: notifyMediaUploadedRoute,
    removeMedia: removeMediaRoute,
  },

  statistics: {
    getCourseStatic: courseStaticRoute,
  },

  enroll: {
    isUserEnrolledInCourse: isUserEnrolledInCourseRoute,
    enrollInCourse: enrollInCourseRoute,
  }

};



export type AppRouter = typeof router;


