const Report = require("../Models/Report");
const {Instructor}= require("../Models/Instructor");
const Course = require("../Models/Course");
const {User}= require("../Models/User");
const mongoose = require('mongoose');


function getAllReports (req,res) {
   let x= Report.find({}).then (function (rep) {
    res.send(rep);
    });
};

const createReport = async(req,res) => {  //add report
        
    const rep_course = req.query.id;
    const reporter_id = req.body.reported_by;

      
            try{const rep = await Report.create(
                { 
                    reported_course: rep_course,
                    reported_by: reporter_id,
                    type: req.body.type,
                    description: req.body.description
                }
            ).then((newReport) => {
                const c = Course.findOne({_id:mongoose.Types.ObjectId(rep_course)}
                ).then((retCourse) =>{
                    console.log(retCourse.Instructor[0]);
                    // console.log(newReport._id);
                    const notifiedInstructor = Instructor.findOneAndUpdate({_id: retCourse.Instructor[0]},{$push:{Reports: newReport._id}}).then(json =>{
                        console.log(json.Reports);
                    });
                });
            });
            
            return res.status(200).json({Message: "Successfully reported Course!"});
           }
           catch(err){
            return console.log(err);
           }
            
        }

const getCourseReports = async(req,res) =>{
    const courseId = req.query.id;
    const reports = Report.find({reported_course : courseId}).then (reps =>{
        return res.status(200).json(reps);
    });

}
    
const deleteReports = async(req,res) =>{
    const del = Report.deleteMany({}).then((deleted) =>{
        return res.status(200).json(deleted);
    })

}

const getReporterName = async(req, res) =>{
    const uId = req.query.id;

    // const i = Instructor.findOne({_id:mongoose.Types.ObjectId(uId)}).then(retUser =>{
    //     return res.status(200).json(retUser.InstrName);
    // });

    // let i = Instructor.findById({_id : uId}).then(retInstructor =>{
    //     return res.status(200).json(i.InstrName);
    // });

}

   
module.exports={ getAllReports, createReport, getCourseReports, deleteReports, getReporterName};
