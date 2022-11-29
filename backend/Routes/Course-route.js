const express= require("express");
const {getAllCourse , viewCourse,viewCourseInstructor, createCourse, viewCourseSubtitle,
     viewCourseExam,viewUserCourse,deleteCourseRating,addCourseRating,calculateCourseRating}= require ("../Controller/course-controllers");


const router = express.Router();

router.get("/",getAllCourse );

router.get('/viewCourse',viewCourse);

router.get('/viewCourseInstructor',viewCourseInstructor);

router.get('/viewCourseSubtitle',viewCourseSubtitle);

router.get('/viewCourseExam',viewCourseExam);

router.post('/createCourse',createCourse);

router.get('/viewUserCourse',viewUserCourse);

router.put('/deleteCourseRating',deleteCourseRating);

router.put('/addCourseRating',addCourseRating);

router.get('/calculateCourseRating',calculateCourseRating);



module.exports=router;

