const course= require("../Models/Course");
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




module.exports={getAllCourse , viewCourse, createCourse};
   