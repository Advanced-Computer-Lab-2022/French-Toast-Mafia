const admin= require("../Models/Admin");

function getAllAdmin (req,res) {
    admin.find({}).then (function (admin) {
    res.send(admin);
    });
};

module.exports=getAllAdmin;
