const course= require("../Models/Course");
const instructor= require("../Models/Instructor");
const user = require("../Models/User");
const mongoose = require('mongoose');

function getAllCourse (req,res) {
    course.find({}).then (function (course) {
    res.status(200).json(course)
    });
};


const viewCourse = async(req , res) => {
    const courseId = req.params.id;

    try{
        const courseToView = await course.findOne({_id:mongoose.Types.ObjectId(courseId)});
        // get the details of the course 
        if (courseToView != null){
            // const courseDetails = 
            // {"Title": courseToView.NameOfCourse,
            // "Subtitles":courseToView.CourseSubtitle,
            // "Summary": courseToView.Summary,
            // "Subject": courseToView.Subject,
            // "Duration": courseToView.Duration,
            // "Level" : courseToView.LevelOfCourse,
            // "Exams" : courseToView.Exams,
            // "Discount": courseToView.Discount
            // "Price": courseToView.Cost,}
            // res.status(200).json(courseDetails);
            res.status(200).json(courseToView);

        }        
    
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const createCourse = async(req,res) => {
       const newCourse = new course ({
        NameOfCourse: req.body.NameOfCourse,
        CourseSubtitle: req.body.CourseSubtitle, 
        Instructor: req.body.Instructor, 
        Duration: req.body.Duration, 
        LevelOfCourse: req.body.LevelOfCourse, 
        Summary: req.body.Summary, 
        Subject: req.body.Subject, 
        Rating: req.body.Rating, 
        NoOfViews: req.body.NoOfViews,
        Discount: req.body.Discount,
        Cost: req.body.Cost,
        CourseCurrency:req.body.CourseCurrency,
        Exams:req.body.Exams,
        DurationDiscount:req.body.DurationDiscount,
        Preview:req.body.Preview,

    }) 
   
        newCourse.save()
        .then (result => res.status(200).send(result))
     
    }

//get courses
function getAllCourse (req,res) {
    course.find({}).then (function (course) {
    res.send(course);
    });
};

const viewCourseInstructor = async(req , res) => {
    const courseId = req.query.id;

    try{
        const courseToView = await course.findOne({_id:mongoose.Types.ObjectId(courseId)});
        // get the details of the course 
        const courseDetails = 
            {"Course Instructor": courseToView.Instructor}

        const InstructorToView = await instructor.
        findOne({_id:mongoose.Types.ObjectId(courseToView.Instructor)});
      // console.log(InstructorToView);
        const InstructorDetails =
            {"Instructor Name": InstructorToView.InstrName,
            "Instructor Email": InstructorToView.InstrEmail}
        res.status(200).json(InstructorDetails);
        
    
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const viewCourseSubtitle = async(req , res) => {
    const courseId = req.query.id;

    try{
        const courseToView = await course.findOne({_id:mongoose.Types.ObjectId(courseId)});
        // get the subtitles of the course 
        const courseSubs = courseToView.CourseSubtitle
            
        res.status(200).json(courseSubs);
    
    }catch(error){
        res.status(400).json({error:error.message})
    }

}


const viewCourseExam = async(req , res) => {
    const courseId = req.query.id;

    try{
        const courseToView = await course.findOne({_id:mongoose.Types.ObjectId(courseId)});
        // get the subtitles of the course 
        const courseExam = courseToView.Exams
            
        res.status(200).json(courseExam);
    
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const viewUserCourse = async(req , res) => {
    const userId = req.query.id;
    const resultCourses = [];
if (userId){
    try{
        const result = await user.findOne({_id:mongoose.Types.ObjectId(userId)});
        //get each user course details
        for (let i = 0; i < result.Courses.length; i++) {
            const courseToView = await course.findOne({_id:mongoose.Types.ObjectId(result.Courses[i])});
            resultCourses.push(courseToView);
        }
        res.status(200).json(resultCourses);
        
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
else{
    res.status(404).send('User not found');
}

   

}
module.exports={getAllCourse , viewCourse, createCourse,viewCourseInstructor, viewCourseSubtitle, viewCourseExam, viewUserCourse};
   