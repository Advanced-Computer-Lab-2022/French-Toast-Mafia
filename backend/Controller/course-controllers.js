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
        const courseDetails = 
            {"Course Name": courseToView.NameOfCourse,
            "Course Subtitles":courseToView.CourseSubtitle,
            "Course Summary": courseToView.Summary,
            "Course Subject": courseToView.Subject,
            "Course Duration": courseToView.Duration,
            "Course Level" : courseToView.LevelOfCourse,
            "Course Price": courseToView.Cost}

        res.status(200).json(courseDetails);
        
    
    }catch(error){
        res.status(400).json({error:error.message})
    }

}


module.exports={getAllCourse , viewCourse};
   