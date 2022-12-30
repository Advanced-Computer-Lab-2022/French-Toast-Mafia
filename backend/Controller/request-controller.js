const Request = require("../Models/Request");
const {Instructor}= require("../Models/Instructor");
const {Admin} = require("../Models/Admin");
const Course = require("../Models/Course");
const {User}= require("../Models/User");
const mongoose = require('mongoose');


function getAllRequests (req,res) {
   let x= Request.find({}).sort({createdAt: -1})
   .then ((req) =>{
    return res.status(200).json(req);
    });
};

const createRequest = async(req,res) => {  //add request   
    const rep_course = req.query.id;
    const requester_id = req.body.requested_by;
    console.log("Heloooooooo");
       const resRequestUser= await Request.find({requested_by:requester_id});
       console.log(resRequestUser);
       console.log(resRequestUser.length);
       console.log("AAAAAAAAAAAA");
       if (!(resRequestUser.length ==0)){
        console.log(resRequestUser.length);
        console.log("BBBBBBBBBBBBBB");
        const resRequestCourse=await Request.find({requested_course:rep_course});
        console.log(resRequestCourse.length);
        if ((resRequestCourse==0)){
            console.log("yaraaaaaaaaaab");
            try{const rep = await Request.create(
                { 
                    requested_course: rep_course,
                    requested_by: requester_id,
                }
            ).then((newRequest) => {
                const c = Course.find({_id:mongoose.Types.ObjectId(rep_course)}
                ).then((c) =>{
                    const notifiedAdmin = Admin.updateMany({$push:{Requests:newRequest._id}}).then(json =>{
                        console.log(json.Requests);
                    });
                })
            });
            return res.status(200).json({Message: "Successfully requested Course!"});
           }
           catch(err){
            return console.log(err);
           }
        }
        else {
            res.status(404).json({Message:"Already Requested Course"});
        } 
    }
    else {
        try{const rep = await Request.create(
            { 
                requested_course: rep_course,
                requested_by: requester_id,
            }
        ).then((newRequest) => {
            const c = Course.find({_id:mongoose.Types.ObjectId(rep_course)}
            ).then((c) =>{
                const notifiedAdmin = Admin.updateMany({$push:{Requests:newRequest._id}}).then(json =>{
                    console.log(json.Requests);
                });
            })
        });
        return res.status(200).json({Message: "Successfully requested Course!"});
       }
       catch(err){
        return console.log(err);
       }

    }
            
        }

const getCourseRequests = async(req,res) =>{
    const courseId = req.query.id;
    Request.find({requested_course : courseId}).then (reps =>{
        return res.status(200).json(reps);
    });

}

const getRequesterName = async(req, res) =>{
    const uId = req.query.id;
    User.findOne({_id:mongoose.Types.ObjectId(uId)}).then(retUser => {
        if(retUser != null){
            return res.status(200).json(retUser.Name);
        }
        else 
        return res.status(400).json(null);
    });        
};

// const getReporterName = async(req, res) =>{
//     const uId = req.query.id;

//     User.findOne({_id:mongoose.Types.ObjectId(uId)}).then(retUser =>{
//         if(retUser != null){
//             return res.status(200).json(retUser.Name);
//         }
//         else{
//             Instructor.findOne({_id:mongoose.Types.ObjectId(uId)}).then(retInstructor =>{
//                 if(retInstructor != null){
//                     return res.status(200).json(retInstructor.InstrName);
//                 }
//                 else
//                     return res.status(400).json(null);
//             })
//         }
//     });        
// };


const getRequestedCourse = async(req, res) =>{
    const cId = req.query.id;
    Course.findOne({_id:mongoose.Types.ObjectId(cId)}).then(retCourse =>{
            return res.status(200).json(retCourse.NameOfCourse);
    });          
};



const updateRequestStatus = async(req, res) =>{
    const cId = req.query.id;
    Request.findByIdAndUpdate({_id:mongoose.Types.ObjectId(cId)},{status: "Resolved"}).then(ret =>{
        return res.status(200).json(ret);
    });
};

// function getAllRequests (req,res) {
//     let x= Request.find({}).sort({createdAt: -1})
//     .then (function (rep) {
//      res.send(rep);
//      });
//  };

  function getRequest(req,res){
    const rId = req.query.id;
    let x= Request.find({__id:rId}).sort({createdAt: -1})
    .then (function (rep) {
             res.send(rep);
             });
         }



   
module.exports={ getAllRequests, createRequest,getCourseRequests,  getRequesterName ,  getRequestedCourse, updateRequestStatus,getRequest};
