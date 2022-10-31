const Instructor = require("../Models/Instructor");
const user=require("../Models/User");

function getAllUser (req,res) {
    user.find({}).then (function (user) {
    res.send(user);
    });
};



module.exports=getAllUser;
