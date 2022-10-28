const course= require("../Models/Course");

function getAllCourse (req,res) {
    course.find({}).then (function (course) {
    res.send(course);
    });
};

module.exports=getAllCourse;
   