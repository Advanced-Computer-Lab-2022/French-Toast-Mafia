const express= require("express");
const { getAllExams , createExam} = require("../Controller/exams-controller");

const router = express.Router();

router.get("/",getAllExams);

router.post("/createExam", createExam);

module.exports=router;

