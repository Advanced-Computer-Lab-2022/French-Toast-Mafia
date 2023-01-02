const reqRefund= require ('../Models/ReqRefund');
const {Instructor}= require("../Models/Instructor");
const {Admin} = require("../Models/Admin");
const Course = require("../Models/Course");
const {User}= require("../Models/User");
const mongoose = require('mongoose');

//get all refunds requests
const getAllrefunds = async (req,res) => {
    const allRefunds = reqRefund.find({}).sort({createdAt: -1})
    .then ((req) =>{
     return res.status(200).json(req);
     });
};

//create refund request
const createRefund = async(req,res) => {  
        const ref_course= req.body.id;
        const requester_id= req.body.requested_by;

        const refRequestUser= await reqRefund.find({requested_by:requester_id});

        if (!(refRequestUser.length ==0)){
            const refRequestCourse=await reqRefund.find({requested_course:ref_course});
            


        }
}


const AcceptRequest = async(req, res) =>{

   const cId = req.query.id;
   const request= await Request.findById(cId);
   console.log(request);
   console.log(request.requested_by);
   if(request) {
     await Request.findByIdAndUpdate({_id:mongoose.Types.ObjectId(cId)},{status:"Accepted"});
     await User.findByIdAndUpdate(request.requested_by,{$pull:{Courses: request.requested_course} } )
     const UserRequest = await User.findByIdAndUpdate({ _id:mongoose.Types.ObjectId(cId)}, {Wallet: Course.Cost*0.5 });
    res.status(200).json(UserRequest);

   }
   else 
      res.status(400).json({error:"Please enter a valid request Id"});
};










module.exports = {getAllrefunds, createRefund, AcceptRequest };