const course= require("../Models/Course");
const instructor= require("../Models/Instructor");
const user = require("../Models/User");
const mongoose = require('mongoose');
const Subtitle = require("../Models/Subtitle");

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
        Promotion: req.body.Promotion,
        Cost: req.body.Cost,
        CourseCurrency:req.body.CourseCurrency,
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
            {"InstrId": InstructorToView._id,
                "InstructorName": InstructorToView.InstrName,
            "InstructorEmail": InstructorToView.InstrEmail}
            const result = [];
            result.push(InstructorDetails);
        res.status(200).json(result);
        
    
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const viewCourseSubtitles = async(req , res) => {
    const courseId = req.query.id;
    console.log("course id: " + courseId)
    const sub = await Subtitle.find({Course:courseId }, {Title:1,_id:1});
    // console.log(sub)
    if (sub == null) {
        res.status(404).send('no subtitles available');
    }
    else {
        res.json(sub);
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

//delete course rating function
const deleteCourseRating = async(req , res) => {
    const courseId=req.query.id;
    const emp=[];
    if (courseId){
        try{
            const result = await course.findOneAndUpdate({_id:mongoose.Types.ObjectId(courseId)}, { Rating: emp }, { new: true });
            res.status(200).json(result);
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

//add course rating function
const addCourseRating = async(req , res) => {
    const courseId=req.query.id;
    const userId=req.body.id;
    const rating=req.body.rating;
    const uId=mongoose.Types.ObjectId(userId);
    const tuple={uId,rating};
    if (courseId){
        try{
            //check if the user has already rated the course
            const check = await course.findOne({_id:mongoose.Types.ObjectId(courseId), Rating:{$elemMatch:{uId:uId}}});
            if (!check){
            const resCourse = await course.findOneAndUpdate({_id:mongoose.Types.ObjectId(courseId)}, { $push: { Rating: tuple } }, { new: true });
            res.status(200).json(resCourse);
            }
            else{
                res.status(400).json({error:"User has already rated this course"});
            }

        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

//calculate rating function
const calculateCourseRating = async(req , res) => {
    const courseId=req.query.id;
    if (courseId){
        try{
            const result = await course.findOne({_id:mongoose.Types.ObjectId(courseId)});
            var sum=0;
            for (let i = 0; i < result.Rating.length; i++) {
                sum+=parseInt(result.Rating[i].rating);
            }
            const avg=sum/result.Rating.length;
            res.status(200).json(avg);
        }catch(error){
            res.status(400).json({error:error.message})
        }   
    }
}

const editCourse = async(req, res) => {
    const courseId = req.query.id;
    if (courseId){
        try{
            const editCourse = await course.findByIdAndUpdate(courseId , req.body);  
            res.status(200).json(editCourse);
        }catch(error){
            res.status(400).json({error:error.message})
        }   
    }
}



module.exports={getAllCourse , viewCourse, createCourse, editCourse, viewCourseInstructor,
     viewCourseSubtitles, viewCourseExam, viewUserCourse,deleteCourseRating,addCourseRating,calculateCourseRating};
   