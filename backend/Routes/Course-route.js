const express= require("express");
const {getAllCourse , viewCourse,viewCourseInstructor, createCourse, viewCourseSubtitle, viewCourseExam,viewUserCourse}= require ("../Controller/course-controllers");


const router = express.Router();

router.get("/",getAllCourse );

router.get('/viewCourse',viewCourse);

router.get('/viewCourseInstructor',viewCourseInstructor);

router.get('/viewCourseSubtitle',viewCourseSubtitle);

router.get('/viewCourseExam',viewCourseExam);

router.post('/createCourse',createCourse);

router.get('/viewUserCourse',viewUserCourse);



module.exports=router;

