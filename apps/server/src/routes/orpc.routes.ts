import { loginRoute, logoutRoute, meRoute, registerRoute } from "./auth/auth.routes";
import { createCourseRoute,  getCourseLessonsRoute, getCourseRoute, getCoursesRoute, getCourseTagsRoute, getLastSeenCoursesRoute, searchCoursesRoute, updateCourseRoute } from "./courses/course.route";
import { createCheckoutSessionRoute, confirmCheckoutSessionRoute } from "./checkout/checkout.route";
import { enrollInCourseRoute, getMyEnrollmentsRoute, isUserEnrolledInCourseRoute } from "./enroll/enroll.route";
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
    getLastSeenCourses: getLastSeenCoursesRoute,
    getCourse: getCourseRoute,
    updateCourse: updateCourseRoute,
    getCourseLessons: getCourseLessonsRoute,
    searchCourses: searchCoursesRoute,
    getCourseTag: getCourseTagsRoute,
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
    getMyEnrollments: getMyEnrollmentsRoute,
  },

  checkout: {
    createCheckoutSession: createCheckoutSessionRoute,
    confirmCheckoutSession: confirmCheckoutSessionRoute,
  },
};


export type AppRouter = typeof router;


