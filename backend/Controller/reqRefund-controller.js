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








module.exports = {getAllrefunds, createRefund};