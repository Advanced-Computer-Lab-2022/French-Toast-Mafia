const course= require("../Models/Course");
const {Instructor}= require("../Models/Instructor");
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
    Instructor.findOneAndUpdate({_id:mongoose.Types.ObjectId(InstrId)},{$push:{Exam:newExam._id}})
        .then(function (instructor) {
      //  res.status(200).json(instructor)
    });
      res.status(200).json({ id: newExam._id});
    }
    else{
      res.status(500).json({message: 'Error in creating exam'});
    }

};

//get exam by course id
const getExamById = async (req,res) => {
    const courseId = req.query.id;
    const result= await Exams.findOne({courseId:mongoose.Types.ObjectId(courseId)});
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

//get mcq by id
const getMcqById = async (req, res) => {
  const examId = req.query.id;
  const mcqId = req.query.mcqId;
  const result = await Exams.findOne({ _id: mongoose.Types.ObjectId(examId) });
  if (result) {
    const mcq = result.mcq;
    for (let i = 0; i < mcq.length; i++) {
      if (mcq[i]._id == mcqId) {
        res.status(200).json(mcq[i]);
      }
    }
  }
  else {
    res.status(500).json({ message: 'Error in getting mcq' });
  }
}


//user solve exam
const solveExam = async (req, res) => {
  const examId = req.query.id;
  const userId = req.query.userId;

  //add user id to exam
  if (examId) {
    //check if user already solved the exam
    const result = await Exams.findOne({ _id: mongoose.Types.ObjectId(examId) });
    if (result) {
      const users = result.users;
      for (let i = 0; i < users.length; i++) {
        if (users[i] == userId) {
          res.status(400).json({ message: 'You already solved this exam' });
          return;
        }
      }

      const rest = await Exams.findByIdAndUpdate(examId, { $push: { users: userId } }, { new: true });
      const mcq = result.mcq;
      const userAnswer = req.body.Answer;
      let score = 0;
      for (let i = 0; i < mcq.length; i++) {
        if (mcq[i].correct === userAnswer[i]) {
          score++;
        }
      }
      
      //create an array of user answers and correct answers
      const userAnswers = [];
      const correctAnswers = [];
      for (let i = 0; i < mcq.length; i++) {
        userAnswers.push(userAnswer[i]);
        correctAnswers.push(mcq[i].correct);
      }
      const examResult = {
        userAnswers: userAnswers,
        correctAnswers: correctAnswers,
        score: score,
        total: mcq.length
      };
      // const newExamResult = new ExamResult(examResult);
      // newExamResult.save();
     // console.log(examResult);
      res.status(200).json(examResult);

    }
    else {
      res.status(400).json({ message: 'Error in solving exam' });
    }
  }




};


//solve mcq in exam
const solveMcq = async (req, res) => {
  const examId = req.query.id;
  const mcqId = req.query.mcqId;
  const userId = req.query.userId;
  const result = await Exams.findOne({ _id: mongoose.Types.ObjectId(examId) });
  if (result) {
    const mcq = result.mcq;
    for (let i = 0; i < mcq.length; i++) {
      if (mcq[i]._id == mcqId) {
        const userAnswer = req.body.userAnswer;
        if (mcq[i].correct === userAnswer) {
          const examResult = {
            examId: examId,
            userId: userId,
            score: 1,
            total: 1
          };
          const newExamResult = new ExamResult(examResult);
          newExamResult.save();
          res.status(200).json({ newExamResult });
        }
        else {
          const examResult = {
            examId: examId,
            userId: userId,
            score: 0,
            total: 1
          };
          const newExamResult = new ExamResult(examResult);
          newExamResult.save();
          res.status(200).json({ newExamResult });
        }
      }
    }
  }
  else {
    res.status(500).json({ message: 'Error in solving mcq' });
  }
}

//get each question and its answers
const getAnswers = async (req, res) => {
  const examId = req.query.id;
  const result = await Exams.findOne({ _id: mongoose.Types.ObjectId(examId) });
  if (result) {
    const mcq = result.mcq;
    const arr = [];
    for (let i = 0; i < mcq.length; i++) {
      const obj = {
        question: mcq[i].question,
        answers: mcq[i].correct
      };
      arr.push(obj);
    }
    res.status(200).json(arr);
  }
  else {
    res.status(500).json({ message: 'Error in getting answers' });
  }
}

//check if user already solved the exam
const checkUser = async (req, res) => {
  const examId = req.query.id;
  const userId = req.query.userId;
  const result = await Exams.findOne({ _id: mongoose.Types.ObjectId(examId) });
   x=false;
  if (result) {
    const users = result.users;
    for (let i = 0; i < users.length; i++) {
      if (users[i] == userId) {
        x=true;
        res.status(200).json({solved:x});
        return;
      }
    }
  }
  else {
    res.status(400).json({ message: 'Error in checking user' });
  }
}







module.exports= {getAllExams, createExam, getExamById, getAllMcq, 
  addMCQ,getMcqById, solveMcq,solveExam, getAnswers,checkUser};
