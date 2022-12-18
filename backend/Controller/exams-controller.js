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
    const InstrId= req.query.instrId;
    const courseId = req.query.courseId;
    const title = req.body.title;
    const description = req.body.description;
    const newExam = new Exams({
        courseId:mongoose.Types.ObjectId(courseId),
        instrId:mongoose.Types.ObjectId(InstrId),
        title: title,
        description: description,
    });
    newExam.save();
    //add exam to course
    course.findOneAndUpdate({_id:
        mongoose.Types.ObjectId(courseId)},{$push:{ExamCourse:newExam._id}})
        .then(function (course) {
      //  res.status(200).json(course)
    });

    //add exam to instructor
    instructor.findOneAndUpdate({_id:mongoose.Types.ObjectId(InstrId)},{$push:{Exam:newExam._id}})
        .then(function (instructor) {
      //  res.status(200).json(instructor)
    });

};




module.exports= {getAllExams, createExam};
