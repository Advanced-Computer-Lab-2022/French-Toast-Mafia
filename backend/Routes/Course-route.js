const express= require("express");
const {getAllCourse , viewCourse,viewCourseInstructor, createCourse}= require ("../Controller/course-controllers");


const router = express.Router();

router.get("/",getAllCourse );

router.get('/viewCourse',viewCourse);

router.get('/viewCourseInstructor',viewCourseInstructor);

router.post('/createCourse',createCourse);

module.exports=router;

