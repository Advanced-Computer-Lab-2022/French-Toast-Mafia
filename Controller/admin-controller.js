const admin= require("../Models/Admin");
const { default: mongoose } = require('mongoose');


//get admins
function getAllAdmin (req,res) {
    admin.find({}).then (function (admin) {
    res.send(admin);
    });
};

module.exports=getAllAdmin;
