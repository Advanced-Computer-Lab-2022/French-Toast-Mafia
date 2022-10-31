const instructor=require("../Models/Instructor");
const course=require("../Models/Course");
var mongoose = require('mongoose');

function getAllInstructors (req,res) {
    instructor.find({}).then (function (instructor) {
    res.send(instructor);
    });
};

//Requirement 6 -->Select Country
const selectCountryInstructor = async (req, res) => {
    
    const userID = req.params.id;
    const {InstrCountry} = req.body;
    const json='{"InstrCountry":"'+InstrCountry+'"}';
    const obj = JSON.parse(json);
    const newCountry=obj.InstrCountry;

    try{
        const u = await instructor.findByIdAndUpdate(userID, {InstrCountry:newCountry}, {new:true});
        res.status(200).json(u)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    console.log(newCountry);
    return newCountry;
};

module.exports={getAllInstructors,selectCountryInstructor};
   