const instructor=require("../Models/Instructor");
const course=require("../Models/Course");

function getAllInstructors (req,res) {
    instructor.find({}).then (function (instructor) {
    res.send(instructor);
    });
};



module.exports={getAllInstructors,viewCoursePriceInstructor};
   