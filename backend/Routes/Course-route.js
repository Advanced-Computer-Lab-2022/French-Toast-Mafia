const express= require("express");
const {getAllCourse , viewCourse,viewCourseInstructor}= require ("../Controller/course-controllers");


const router = express.Router();

router.get("/",getAllCourse );

router.get('/viewCourse',viewCourse);

router.get('/viewCourseInstructor',viewCourseInstructor);

module.exports=router;

