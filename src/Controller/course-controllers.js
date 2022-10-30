const Course= require("../Models/Course");
const { default: mongoose } = require('mongoose');
const Instructor = require("../Models/Instructor");


    


function getAllCourse (req,res) {
    Course.find({}).then (function (Course) {
    res.send(Course);
    });
}


module.exports= {getAllCourse } 
   