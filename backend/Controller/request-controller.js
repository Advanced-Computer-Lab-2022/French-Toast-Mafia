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



const getRequestedCourse = async(req, res) =>{
    const cId = req.query.id;
    console.log(cId);
    const s= await  Course.findById(cId);
   console.log(s);
  if(s){
    const r =s.NameOfCourse;
    res.status(200).json(r);

  }
  else 
  
  res.status(400).json(null);        
};



const AcceptRequest = async(req, res) =>{
    const cId = req.query.id;
    console.log("hiiii");
   const request= await Request.findById(cId);
   console.log(request);
   console.log(request.requested_by);
   if(request) {
    await Request.findByIdAndUpdate({_id:mongoose.Types.ObjectId(cId)},{status:"Accepted"});
     await User.findByIdAndUpdate(request.requested_by,{$push:{Courses: request.requested_course} } )
     const UserRequest = await User.findByIdAndUpdate(request.requested_by, { $push: { Progress: { courseId: request.requested_course, Progress: 0 } } });
    res.status(200).json(UserRequest);

   }
   else 
      res.status(400).json({error:"Please enter a valid request Id"});
    //  const request= await  Request.findByIdAndUpdate({_id:mongoose.Types.ObjectId(cId)},{status: "Accepted"});
    //    //res.status(200).json(ret);
    //    console.log(request);
    //      const s= await User.findByIdAndUpdate({_id:request.requested_by},{$push:{Courses: request.requested_course}});  
    //      res.status(200).json(s);


};

 const RejectRequest = async (req,res) =>{
      const rId= req.query.id;
      Request.findByIdAndUpdate({_id:mongoose.Types.ObjectId(rId)},{status: "Rejected"}).then(ret =>{
          return res.status(200).json(ret);
        });
}; 





  function getRequest(req,res){
    const rId = req.query.id;
    let x= Request.find({__id:rId}).sort({createdAt: -1})
    .then (function (rep) {
             res.send(rep);
             });
         }



   
module.exports={ getAllRequests, createRequest,getCourseRequests,  getRequesterName ,  getRequestedCourse, AcceptRequest,getRequest, RejectRequest};
