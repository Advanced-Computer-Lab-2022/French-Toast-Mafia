const express= require("express");
const {getAllCourse , viewCourse,viewCourseInstructor, createCourse, viewCourseSubtitle, viewCourseExam}= require ("../Controller/course-controllers");


const router = express.Router();

router.get("/",getAllCourse );

router.get('/viewCourse',viewCourse);

router.get('/viewCourseInstructor',viewCourseInstructor);

router.get('/viewCourseSubtitle',viewCourseSubtitle);

router.get('/viewCourseExam',viewCourseExam);

router.post('/createCourse',createCourse);



module.exports=router;

