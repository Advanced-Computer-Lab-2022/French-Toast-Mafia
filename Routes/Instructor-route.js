import express from "express";
const Course= require( "../Controller/instructor-controller");


const router = express.Router();

router.get("/",getInstructor );

module.exports=router;