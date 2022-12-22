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
    const question=req.body.question;
    const choice1=req.body.choice1;
    const choice2=req.body.choice2;
    const choice3=req.body.choice3;
    const choice4=req.body.choice4;
    const correct=req.body.correct;
    const mcq = {
        question: question,
        choice1: choice1,
        choice2: choice2,
        choice3: choice3,
        choice4: choice4,
        correct: correct,
    };
    const newExam = new Exams({
        courseId:mongoose.Types.ObjectId(courseId),
        instrId:mongoose.Types.ObjectId(InstrId),
        title: title,
        description: description,
        mcq: mcq
    });
    newExam.save();
   

    if(newExam){
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
      res.status(200).json({ id: newExam._id});
    }
    else{
      res.status(500).json({message: 'Error in creating exam'});
    }

};

//get exam by id
const getExamById = async (req,res) => {
    const examId = req.query.id;
    const result= await Exams.findOne({_id:mongoose.Types.ObjectId(examId)});
    if(result){
        res.status(200).json(result);
    }
    else{
        res.status(500).json({message: 'Error in getting exam'});
    }
}

const addMCQ = async (req, res) => {
  const ExamId = req.query.id;
  if (ExamId) {
    const mcq = [
      {
        question: req.body.question,
        choice1: req.body.choice1,
        choice2: req.body.choice2,
        choice3: req.body.choice3,
        choice4: req.body.choice4,
        correct: req.body.correct,
      }
    ];
    const result = await Exams.findByIdAndUpdate(ExamId, { $push: { mcq: mcq } }, { new: true });
    res.status(200).send(result);
  }
  else {
    res.status(400).json({ error: "Please provide the exam id" });
  }

}

// find mcq by instructor id 
const getAllMcq = async (req, res) => {
  const examId = req.query.id;
  const allMcq = [];
 const resExam = await Exams.findOne({ _id: mongoose.Types.ObjectId(examId) });
        if (resExam) {
          allMcq.push(resExam.mcq);
          const arr=[];
          for (let i = 0; i < allMcq.length; i++) {
            for (let j = 0; j < allMcq[i].length; j++) {
              arr.push(allMcq[i][j]);
            }
          }

          res.status(200).json(arr);
        }
        else {
          res.status(500).json({ message: 'Error in getting mcq' });
        }
        
};




module.exports= {getAllExams, createExam, getExamById, getAllMcq, addMCQ};
