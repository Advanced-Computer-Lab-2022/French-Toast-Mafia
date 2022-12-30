const express= require("express");
const { getAllExams , createExam,getExamById,addMCQ,getAllMcq,
    getMcqById,solveMcq,solveExam,getAnswers,checkUser,getExam} = require("../Controller/exams-controller");

const router = express.Router();

router.get("/getAllExams",getAllExams);

router.post("/createExam", createExam);

router.get("/getExamById",getExamById);

router.post("/addMCQ",addMCQ);

router.get("/getAllMcq",getAllMcq);

router.get("/getMcqById",getMcqById);

router.post("/solveMcq",solveMcq);

router.post("/solveExam",solveExam);

router.get("/getAnswers",getAnswers);

router.get("/checkUser",checkUser);

router.get("/getExam",getExam);



module.exports=router;

