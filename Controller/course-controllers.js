const course= require("../Models/Course");

function getAllCourses (req,res) {
    course.find({}).then (function (course) {
    res.send(course);
    });
};

module.exports=getAllCourses;
   