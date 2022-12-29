const Subtitle = require("../Models/Subtitle");
const course= require("../Models/Course");
const mongoose = require('mongoose');
const calculateCourseDuration = require('./course-controllers')

function getAllSubtitles (req,res) {
    Subtitle.find({}).then (function (Subtitle) {
    res.status(200).json(Subtitle)
    });
};

//add subtitle
function addSubtitle (req,res) {
    const courseId = req.query.id;
    const {Title,Question,Answer,Video,Description,Duration} = req.body;
    const newExcercise={Question,Answer};
    const newSubtitle = new Subtitle({
        Course : courseId,
        Title,
        Exercise : newExcercise,
        Video,
        Description,
        Duration
    }); 
    newSubtitle.save();
    //add subtitle to course
    course.findOneAndUpdate({_id:
        mongoose.Types.ObjectId(courseId)},{$push:{CourseSubtitle:newSubtitle._id}})
        .then(function (course) {
        res.status(200).json(course)
    });
};

//delete subtitle
function deleteSubtitle (req,res) {
    const subId = req.query.id;
    Subtitle.findOneAndDelete({_id:mongoose.Types.ObjectId(subId)}).then(function (Subtitle) {
        res.status(200).json(Subtitle)
    });
};

//delete subtitle from course
const deleteSubtitleFromCourse= async (req,res) =>{
    const subId = req.query.id;
    // const courseId = req.query.courseId;
    if (subId){
        const subRes= await Subtitle.findOne({_id:mongoose.Types.ObjectId(subId)});
        const courseId = subRes.Course;
        try{
            const courseRes= await course.findOneAndUpdate({_id:mongoose.Types.ObjectId(courseId)},{$pull:{CourseSubtitle:mongoose.Types.ObjectId(subId)}});
            const subRes= await Subtitle.findOneAndDelete({_id:mongoose.Types.ObjectId(subId)});
            res.status(200).json(subRes);
    }
    catch(err){
        res.status(500).json(err);
    }
    }
};


//find subtitle by id
const viewSubtitle = async(req , res) => {
    const subId = req.query.id;
    try{
        const subtitleToView = await Subtitle.findOne({_id:mongoose.Types.ObjectId(subId)});
        // get the details of the course 
        if (subtitleToView != null){
            res.status(200).json(subtitleToView);
        }        
    
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//add excercise
function addExcercise (req,res) {
    const subId=req.query.id;
    const {Question,Answer} = req.body;
    const newExcercise={Question,Answer};
    Subtitle.findOneAndUpdate({_id:
        subId},{$push:{Exercise:newExcercise}})
        .then(function (Subtitle) {
        res.status(200).json(Subtitle)
    });
};

//delete excercise
function deleteExcercise (req,res) {
    const subId=req.query.id;
    const {Question,Answer} = req.body;
    const ex={Question,Answer};
    Subtitle.findOneAndUpdate({_id:
        subId},{$pull:{Exercise:ex}})
        .then(function (Subtitle) {
        res.status(200).json(Subtitle)
    });
};

//remove all excercises
function removeAllExcercises (req,res) {
    const subId=req.query.id;   
    Subtitle.findOneAndUpdate({_id:
        subId},{$set:{Exercise:[]}})
        .then(function (Subtitle) {
        res.status(200).json(Subtitle)
    });
};

//remove all subtitles from course
function removeAllSubtitles (req,res) {
    const courseId=req.query.id;
    course.findOneAndUpdate({_id:
        courseId},{$set:{CourseSubtitle:[]}})
        .then(function (course) {
        res.status(200).json(course)
    });
};

//get course's subtitles' videos
const getCourseSubtitlesVideos = async (req,res) => {
    const courseId=req.query.id;
   const resSubtitle = await Subtitle.find({Course:courseId});
   resVideos=[];
   for (let i=0;i<resSubtitle.length;i++){
       resVideos.push(resSubtitle[i].Video);
   }
    res.status(200).json(resVideos);

};

//get subtitles excercises by course
const getCourseSubtitlesExcercises = async (req,res) => {
    const courseId=req.query.id;
    const resSubtitle = await Subtitle.find({Course:courseId});
    resExcercises=[];
    for (let i=0;i<resSubtitle.length;i++){
        resExcercises.push(resSubtitle[i].Exercise);
    }
    res.status(200).json(resExcercises);
};

const editSubtitle = async(req, res) => {
    const subId = req.query.id;
    if (subId){
        try{
            const updatedSub = await Subtitle.findByIdAndUpdate(subId , req.body);  
            res.status(200).json(updatedSub);
        }catch(error){
            res.status(400).json({error:error.message})
        }   
    }
}

//add video description
function addVideoDescription (req,res) {
    const subId=req.query.id;
    const {Description} = req.body;
    Subtitle.findOneAndUpdate({_id:
        subId},{$set:{Description:Description}})
        .then(function (Subtitle) {
        res.status(200).json(Subtitle)
    });
};

//empty subtitles array in course
function emptySubtitlesArray (req,res) {
    const courseId=req.query.id;
    course.findOneAndUpdate({_id:
        courseId},{$set:{CourseSubtitle:[]}})
        .then(function (course) {
        res.status(200).json(course)
    });
};

//get excercises questions
const getExcercisesQuestions = async (req,res) => {
    const courseId=req.query.id;
    const resSubtitle = await Subtitle.find({Course:courseId});
    resExcercises=[];
    for (let i=0;i<resSubtitle.length;i++){
        for (let j=0;j<resSubtitle[i].Exercise.length;j++){
            resExcercises.push(resSubtitle[i].Exercise[j].Question);
        }
    }
    res.status(200).json(resExcercises);
};

//get excercises answers
const getExcercisesAnswers = async (req,res) => {
    const courseId=req.query.id;
    const resSubtitle = await Subtitle.find({Course:courseId});
    resExcercises=[];
    for (let i=0;i<resSubtitle.length;i++){
        for (let j=0;j<resSubtitle[i].Exercise.length;j++){
            resExcercises.push(resSubtitle[i].Exercise[j].Answer);
        }
    }
    res.status(200).json(resExcercises);
};

//add notes
function addNotes (req,res) {
    const subId=req.query.id;
    const {Notes} = req.body;
    Subtitle.findOneAndUpdate({_id:
        subId},{$set:{Notes:Notes}})
        .then(function (Subtitle) {
        res.status(200).json(Subtitle)
    });
};

//view all course subtitles
const viewAllCourseSubtitles = async (req,res) => {
    const courseId=req.query.id;
    const resSubtitle = await Subtitle.find({Course:courseId});
    res.status(200).json(resSubtitle);
};

//get Subtitle Video
const viewSubtitleVideo = async (req,res) => {
    const subId=req.query.id;
  //  const resSubtitle = await Subtitle.findOne({_id:subId}).select('Video');
    const resSubtitle = await Subtitle.findById(subId, { _id:0, Video: 1, Description: 1 });
    res.status(200).json(resSubtitle);
};

//get subtitle notes
const viewSubtitleNotes = async (req,res) => {
    const subId=req.query.id;
    const resSubtitle = await Subtitle
    .findById(subId, { _id:0, Notes: 1 });
    res.status(200).json(resSubtitle);
};



    

module.exports = {getAllSubtitles,addSubtitle, editSubtitle, addExcercise,deleteExcercise,removeAllExcercises, viewSubtitle,
    deleteSubtitle,deleteSubtitleFromCourse,removeAllSubtitles,getCourseSubtitlesVideos,
    getCourseSubtitlesExcercises,addVideoDescription,emptySubtitlesArray,getExcercisesQuestions,
    getExcercisesAnswers,addNotes,viewAllCourseSubtitles,viewSubtitleVideo,viewSubtitleNotes};