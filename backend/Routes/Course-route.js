import express from "express";
const Course= require( "../Controller/course-controller");


const router = express.Router();

router.get("/",getAllCourse );

module.exports=router;

