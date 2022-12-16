const course= require("../Models/Course");
const instructor= require("../Models/Instructor");
const Exams = require("../Models/Exams");
const mongoose = require('mongoose');

const getAllExams= async (req, res) =>{
    Exams.find({}).then (function (Exams) {
        res.status(200).json(Exams)
        });
};
//add exam
const createExam = async (req,res) => {
    const courseId = req.query.id;
    const {title,description} = req.body;
    const newExam = new Exams({
        courseId,
        title,
        description
    });
    newExam.save();
    //add exam to course
    course.findOneAndUpdate({_id:
        mongoose.Types.ObjectId(courseId)},{$push:{ExamCourse:newExam._id}})
        .then(function (course) {
        res.status(200).json(course)
    });
};


module.exports= {getAllExams, createExam};
