const course= require("../Models/Course");
const Instructor = require("../Models/Instructor");
const { default: mongoose } = require('mongoose');


//create course 
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



module.exports={createCourse,getAllCourse};
   