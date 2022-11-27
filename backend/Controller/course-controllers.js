const course= require("../Models/Course");
const instructor= require("../Models/Instructor");
const mongoose = require('mongoose');

function getAllCourse (req,res) {
    course.find({}).then (function (course) {
    res.status(200).json(course)
    });
};


const viewCourse = async(req , res) => {
    const courseId = req.query.id;

    try{
        const courseToView = await course.findOne({_id:mongoose.Types.ObjectId(courseId)});
        // get the details of the course 
        const courseDetails = 
            {"CourseName": courseToView.NameOfCourse,
            "CourseSubtitles":courseToView.CourseSubtitle,
            "CourseSummary": courseToView.Summary,
            "CourseSubject": courseToView.Subject,
            "CourseDuration": courseToView.Duration,
            "CourseLevel" : courseToView.LevelOfCourse,
            "CoursePrice": courseToView.Cost}

        res.status(200).json(courseDetails);
        
    
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
        Cost: req.body.Cost
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


module.exports={getAllCourse , viewCourse, createCourse,viewCourseInstructor};
   