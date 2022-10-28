const Admin= require("../Models/Admin");
const course=require("../Models/Course");

function getAllAdmin (req,res) {
    Admin.find({}).then (function (Admin) {
    res.send(Admin);
    });
};

module.exports=getAllAdmin;
