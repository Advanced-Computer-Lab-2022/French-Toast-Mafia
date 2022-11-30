const course= require("../Models/Course");
const instructor= require("../Models/Instructor");
const Exams = require("../Models/Exams");
const mongoose = require('mongoose');

const getAllExams= async (req, res) =>{
    Exams.find({}).then (function (Exams) {
        res.status(200).json(Exams)
        });
};


const createExam = async (req,res) =>{
    const newExam= new Exam ({
        Course: req.body.Course,
        ExamId: req.body.ExamId,
        Questions: req.body.Questions,
        Choices: req.body.Choices
    })
    newExam.save()
    .then (result => res.status(200).send(result))
 
}

module.exports= {getAllExams, createExam};
