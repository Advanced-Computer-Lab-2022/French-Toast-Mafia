const course= require("../Models/Course");
const {Instructor}= require("../Models/Instructor");
const {User} = require("../Models/User");
const mongoose = require('mongoose');
const Subtitle = require("../Models/Subtitle");
const Exam = require("../Models/Exams");

function getAllCourse (req,res) {
    course.find({}).then (function (course) {
    res.status(200).json(course)
    });
};


function getPublishedCourses (req,res) {
    course.find({"Published" : true}).then (function (course) {
    res.status(200).json(course)
    });
};


const viewCourse = async(req , res) => {
    const courseId = req.query.id;

    try{
        const courseToView = await course.findById(mongoose.Types.ObjectId(courseId));
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

const getSubjects = async(req, res) => {
   const Subjects = [];
    course.find({}).then (courses => {
        for(let i = 0 ; i < courses.length ; i++){
            if(!Subjects.includes(courses[i].Subject))
                Subjects.push(courses[i].Subject)
        }
        res.status(200).json(Subjects)
        });
}

const viewCourseInstructor = async(req , res) => {
    const courseId = req.query.id;

    try{
        const courseToView = await course.findById(mongoose.Types.ObjectId(courseId));
        // get the details of the course 
        const courseDetails = 
            {"Course Instructor": courseToView.Instructor}

        const InstructorToView = await Instructor.
        findById(mongoose.Types.ObjectId(courseToView.Instructor));
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
        const courseToView = await course.findById(mongoose.Types.ObjectId(courseId));
        // get the subtitles of the course 
        const courseExam = courseToView.Exams
            
        res.status(200).json(courseExam);
    
    }catch(error){
        res.status(400).json({error:error.message})
    }

}
//view User course
const viewUserCourse= async(req , res) => {
    const userId = req.query.id;
    const courseId = req.query.courseId;
    if (userId){
        if (courseId){
            const result = await User.findById(mongoose.Types.ObjectId(userId));
            if (result.Courses.includes(courseId)){
                const courseRes= await course.findById(mongoose.Types.ObjectId(courseId));
                res.status(200).json(courseRes);
            }
            else{
                res.status(404).json({message:"course not found"})
            }
        }
        else{
            res.status(404).json({message:"course id not found"})
        }
    }
    else{
        res.status(404).json({message:"user not found"})
    }
}

const viewUserCourses = async(req , res) => {
    const userId = req.query.id;
    const resultCourses = [];
if (userId){
    try{
        const result = await User.findById(mongoose.Types.ObjectId(userId));
        //get each user course details
        for (let i = 0; i < result.Courses.length; i++) {
            const courseToView = await course.findById(mongoose.Types.ObjectId(result.Courses[i]));
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

const removeCourseRating = async(req, res) =>{
    const courseId = req.query.id;
    const resCourse = await course.findOneAndUpdate({_id:mongoose.Types.ObjectId(courseId)}, { $pop: { Rating: tuple } }, { new: true });
    res.status(200).json(resCourse);

}

//add course rating function
const addCourseRating = async(req , res) => {
    const courseId=req.query.id;
    const userId=req.body.id;
    
    const u = await User.findOne({_id:mongoose.Types.ObjectId(userId)})
    if(u){
        const username = u.Name 
        const rating=req.body.rating;
        const review=req.body.review;
        const uId = mongoose.Types.ObjectId(userId);
        const tuple={uId,rating,review,username};
        if (courseId){
            try{
                //check if the user has already rated the course
                const check = await course.findOne({_id:mongoose.Types.ObjectId(courseId), Rating:{$elemMatch:{uId:uId}}});
                if (!check){
                await course.findOneAndUpdate({_id:mongoose.Types.ObjectId(courseId)}, { $push: { Rating: tuple } }, { new: true }).then(async resCourse => {
                    var sum=0;
                    for (let i = 0; i < resCourse.Rating.length; i++) {
                        sum+=parseInt(resCourse.Rating[i].rating);
                    }
                    const avg=sum/resCourse.Rating.length;
                await course.findByIdAndUpdate(courseId , {avgRating:avg}, { new: true }).then(r =>{ return r.status(200).json(r)});
                });
               
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
    else{
        const username = "Anonymous User"
        const uId = mongoose.Types.ObjectId(userId);
        const rating=req.body.rating;
        const review=req.body.review;
        const tuple={uId,rating,review,username};
        if (courseId){
            try{
                //check if the user has already rated the course
                const check = await course.findOne({_id:mongoose.Types.ObjectId(courseId), Rating:{$elemMatch:{uId:uId}}});
                if (!check){
                await course.findOneAndUpdate({_id:mongoose.Types.ObjectId(courseId)}, { $push: { Rating: tuple } }, { new: true }).then(async resCourse => {
                    var sum=0;
                    for (let i = 0; i < resCourse.Rating.length; i++) {
                        sum+=parseInt(resCourse.Rating[i].rating);
                    }
                    const avg=sum/resCourse.Rating.length;
                await course.findByIdAndUpdate(courseId , {avgRating:avg}, { new: true }).then(r =>{ return r.status(200).json(r)});
                });
               
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
   
}


//calculate rating function
const calculateCourseRating = async(req , res) => {
    const courseId=req.query.id;
    if (courseId){
        try{
            const result = await course.findById(mongoose.Types.ObjectId(courseId));
            var sum=0;
            for (let i = 0; i < result.Rating.length; i++) {
                sum+=parseInt(result.Rating[i].rating);
            }
            const avg=sum/result.Rating.length;
            await course.findByIdAndUpdate(courseId , {avgRating:avg}, { new: true });
            res.status(200).json(avg);
            return avg;
        }catch(error){
            res.status(400).json({error:error.message})
        }   
    }
}

const viewCourseRating = async(req, res) => {
    const courseId=req.query.id;
    if (courseId){
        try{
            const result = await course.findById(mongoose.Types.ObjectId(courseId));
            res.status(200).json(result.Rating);
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

//empty course list from user
const emptyCourseList = async(req , res) => {
    const userId=req.query.id;
    const emp=[];
    if (userId){
        try{
            const result = await User.findOneAndUpdate({_id:mongoose.Types.ObjectId(userId)}, { Courses: emp }, { new: true });
            res.status(200).json(result);
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

//add course to user
const registerCourseToUser = async(req , res) => {
    const userId=req.query.id;
    const courseId=req.body.id;
    const cId=mongoose.Types.ObjectId(courseId);
    if (userId){
        try{
            //check if the user has already enrolled in the course
            const check = await User.findOne({_id:mongoose.Types.ObjectId(userId), Courses:{$elemMatch:{cId:cId}}});
            if (!check){
            const resUser = await User.findOneAndUpdate({_id:mongoose.Types.ObjectId(userId)}, { $push: { Courses: cId } }, { new: true });
            res.status(200).json(resUser);
            }
            else{
                res.status(400).json({error:"User has already enrolled in this course"});
            }

        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

//requirement (12) choose a course from the results and view (but not open) its details including course subtitles, 
//excercises , total hours of each subtitle, total hours of the course and price 
//(including % discount if applicable) according to the country selected
const viewCourseDetails = async(req , res) => {
    const courseId = req.query.id;
    const country = req.query.country;
    const resultCourses = [];
    const resSubtitles = [];
    const resSubtitlesDetails = [];
    const resTitles = [];
    const resHours=[];
    const resExercises = [];
    const resQuestions = [];
    if (courseId){
        try{
        const result = await course.findById(mongoose.Types.ObjectId(courseId));
        //get subtitles of the course
        for (let i = 0; i < result.CourseSubtitle.length; i++) {
            const subtitleToView = await Subtitle.findById(mongoose.Types.ObjectId(result.CourseSubtitle[i]));
            resSubtitles.push(subtitleToView);
        }

        //get each subtitle details
        for (let i = 0; i < resSubtitles.length; i++) {
            const subtitleToView = await
            Subtitle.findById(mongoose.Types.ObjectId(resSubtitles[i]));
            resSubtitlesDetails.push(subtitleToView);
        }
        //get each subtitle titles
        for (let i = 0; i < resSubtitlesDetails.length; i++) {
            resTitles.push(resSubtitlesDetails[i].Title);
        }
         //get each subtitle excercises
         for (let i = 0; i < resSubtitlesDetails.length; i++) {
            resExercises.push(resSubtitlesDetails[i].Exercise);
        }
        //get each excercise question
        for (let i = 0; i < resExercises.length; i++) {
            for (let j = 0; j < resExercises[i].length; j++) {
                resQuestions.push(resExercises[i][j].Question);
            }
        }
            
        //get total hours of each subtitle
        for (let i = 0; i < resSubtitlesDetails.length; i++) {
            const subtitleHours = await
            Subtitle.findById(mongoose.Types.ObjectId(resSubtitlesDetails[i]._id));
            resHours.push(subtitleHours.Duration);
        }
        //get total hours of the course
        const totalHours = result.Duration;
        //get course price
        const coursePrice = result.Cost;
 
        const resCourse = {
            "SubtitlesTitles":resTitles,
            "Excercises":resQuestions,
            "SubtitlesHours":resHours,
            "TotalHours":totalHours,
            "CoursePrice":coursePrice
        }
        resultCourses.push(resCourse);
        res.status(200).json(resultCourses);

        }catch(error){
            res.status(400).json({error:error.message})
        }
    }
    else{
        res.status(404).send('Course not found');
    }
}

//calculate total duration of the course from subtitles duration
const calculateCourseDuration = async(req , res) => {
    const courseId = req.query.id;
    if (courseId){
        try{
            const result = await course.findById(mongoose.Types.ObjectId(courseId));
            var sum=0;
            for (let i = 0; i < result.CourseSubtitle.length; i++) {
                const subtitleToView = await Subtitle.findById(mongoose.Types.ObjectId(result.CourseSubtitle[i]));
                sum+=parseInt(subtitleToView.Duration);
            }
            await course.findByIdAndUpdate(courseId , {Duration:sum}, { new: true });
            res.status(200).json(sum);
            return sum;
            
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

const getMaxPrice = async(req, res) => {
    let max = 0;
    course.find({}).then (courses => {
        for(let i = 0 ; i < courses.length ; i++){
            if (max < courses[i].Cost)
                max = courses[i].Cost
        }
        // courses.forEach((item, index) => {
        //     console.log(Object.keys(courses))
        //   })
        res.status(200).json(max)
        });
}

//get course's preview' videos
const getCoursePreviewVideos = async (req,res) => {

    course.find({}).then (courses => {
    resVideos=[];
    for (let i=0;i<courses.length;i++){
        resVideos.push(courses[i].Preview);
    }
     res.status(200).json(resVideos);
 
 });
}

const updatePublished = async( req, res) => {
    course.updateMany({},{$set: {'Published' : true}}).then(json =>{
        res.status(200).json("bleh");
    })
   
}

const removeSubtitle = async( req, res) =>{
    const cId = req.query.id;
    //{$pop:{CourseSubtitle:1}},
    await course.findOneAndUpdate({_id:mongoose.Types.ObjectId(cId)},{$pop:{CourseSubtitle:1}}, {$set:{Duration: 0}}).then(json =>{
        res.status(200).json(json);
    });

}

const clearExams = async(req, res) =>{
    const cId = req.query.id;
    //{$pop:{CourseSubtitle:1}},
    await course.findOneAndUpdate({_id:mongoose.Types.ObjectId(cId)},{$set:{ExamCourse: []}}).then(json =>{
        res.status(200).json(json);
    });
}

const updateInstructorId = async( req, res) => {
    const cId = req.query.id;
    course.findByIdAndUpdate({_id:mongoose.Types.ObjectId(cId)},{$set: {Instructor: [mongoose.Types.ObjectId("638406b772a816f9a6130b87"),"Sara sherif"]}}).then(json =>{
        res.status(200).json(json);
    })
   
}

const deleteCourse = async(req, res) => {
    const cId = req.query.id;
    course.findByIdAndDelete({_id:mongoose.Types.ObjectId(cId)}).then(json =>{
        Instructor.findByIdAndUpdate({_id:mongoose.Types.ObjectId(json.Instructor[0])},{$pull: {CourseGiven: mongoose.Types.ObjectId(cId)}}).then(json =>{})
        Subtitle.deleteMany({ Course: {_id:mongoose.Types.ObjectId(cId)}}).then(json =>{})
        Exam.deleteMany({courseId: {_id:mongoose.Types.ObjectId(cId)}}).then(json =>{})
        res.status(200).json(json);
    })
}

const publishCourse = async(req, res) =>{
    const cId = req.query.id;
    course.findByIdAndUpdate({_id:mongoose.Types.ObjectId(cId)}, {$set:{Published : true}}).then(json =>{ return res.status(200).json(json);})
}

const deleteReview = async(req, res) =>{
    const cId = req.query.id;
    course.findByIdAndUpdate({_id:mongoose.Types.ObjectId(cId)}, {$pull:{Rating : {'uId' : mongoose.Types.ObjectId("63a6407ff29347d86eabd440")}}}).then(json =>{ return res.status(200).json(json);})
}

module.exports={getAllCourse , getPublishedCourses, viewCourse, createCourse, editCourse, 
    viewCourseInstructor, getMaxPrice, getSubjects,updatePublished, deleteCourse,
     viewCourseSubtitles, viewCourseExam, viewUserCourse, clearExams, publishCourse,
     deleteCourseRating,addCourseRating,calculateCourseRating, updateInstructorId,
     viewCourseRating,emptyCourseList,registerCourseToUser, removeSubtitle, deleteReview,
     viewCourseDetails,calculateCourseDuration , getCoursePreviewVideos };
   