const reqRefund= require ('../Models/ReqRefund');
const {Instructor}= require("../Models/Instructor");
const {Admin} = require("../Models/Admin");
const {Course} = require("../Models/Course");
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
        console.log(ref_course);
        console.log(requester_id);
        console.log("1------------------------------------------------------")
        const refRequestUser= await reqRefund.find({requested_by:requester_id});
        console.log(refRequestUser);
        console.log("2------------------------------------------------------")
        if (!(refRequestUser.length ==0)){
            const refRequestCourse=await reqRefund.find({requested_course:ref_course});
            console.log(refRequestCourse);
            console.log("3------------------------------------------------------")
            if ((refRequestCourse==0)){
                try {
                    console.log("4------------------------------------------------------")
                    const ref = await reqRefund.create({
                        requested_course: ref_course,
                        requested_by: requester_id,
                    }).then((newRequest) => {
                        const newreq = Course.find({_id:mongoose.Types.ObjectId(ref_course)}
                        ).then((c) =>{
                            const adminRequest = Admin.updateMany({$push:{Requests:newRequest._id}})
                                .then(json =>{console.log(json.Requests);
                                });
                    });
                });
                console.log("5------------------------------------------------------")
                return res.status(200).json({Message: "Successfully requested refund!"});
            }catch (error){
                return console.log(error);
            }
        } else {
            res.status(404).json({Message:"Already Requested refund"});
            }
        } else {
            try{
                console.log("7------------------------------------------------------")
                const refund= await reqRefund.create({
                    requested_course: ref_course,
                    requested_by: requester_id,
                }).then((newRequest) => {
                    const newreq = Course.find({_id:mongoose.Types.ObjectId(ref_course)}
                    ).then((c) =>{
                        const adminRequest = Admin.updateMany({$push:{Requests:newRequest._id}})
                            .then(json =>{console.log(json.Requests);
                            });
                })
            });
            return res.status(200).json({Message: "Successfully requested refund!"});

             }catch{
                return console.log(error);
                }
        }

    }



const AcceptRefund = async(req, res) =>{

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




module.exports = {getAllrefunds, createRefund, AcceptRefund };