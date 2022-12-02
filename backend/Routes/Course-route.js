const express= require("express");
const {getAllCourse , viewCourse,viewCourseInstructor, createCourse, editCourse, viewCourseSubtitles,
     viewCourseExam,viewUserCourse,deleteCourseRating,addCourseRating,calculateCourseRating,
emptyCourseList,registerCourseToUser,viewCourseDetails,calculateCourseDuration}= require ("../Controller/course-controllers");


const router = express.Router();

router.get("/getAllCourse",getAllCourse );

router.get('/viewCourse',viewCourse);

router.get('/viewCourseInstructor',viewCourseInstructor);

router.get('/viewCourseSubtitles',viewCourseSubtitles);

router.get('/viewCourseExam',viewCourseExam);

router.post('/createCourse',createCourse);

router.post('/editCourse', editCourse);

router.get('/viewUserCourse',viewUserCourse);

router.put('/deleteCourseRating',deleteCourseRating);

router.put('/addCourseRating',addCourseRating);

router.get('/calculateCourseRating',calculateCourseRating);

router.get('/emptyCourseList',emptyCourseList);

router.post('/registerCourseToUser',registerCourseToUser);

router.get('/viewCourseDetails',viewCourseDetails);

router.get('/calculateCourseDuration',calculateCourseDuration);





module.exports=router;

