const express= require("express");
const { getAllExams , createExam,getExamById,addMCQ,getAllMcq} = require("../Controller/exams-controller");

const router = express.Router();

router.get("/getAllExams",getAllExams);

router.post("/createExam", createExam);

router.get("/getExamById",getExamById);

router.post("/addMCQ",addMCQ);

router.get("/getAllMcq",getAllMcq);

module.exports=router;

