const instructor=require("../Models/Instructor");

function getAllInstructor (req,res) {
    instructor.find({}).then (function (instructor) {
    res.send(instructor);
    });
};

module.exports=getAllInstructor;
   