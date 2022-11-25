const express= require("express");
const {getAllCourse , viewCourse}= require ("../Controller/course-controllers");


const router = express.Router();

router.get("/",getAllCourse );

router.get('/viewCourse/:id',viewCourse);

module.exports=router;

