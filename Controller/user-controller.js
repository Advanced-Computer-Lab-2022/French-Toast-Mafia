const user=require("../Models/User");
const Course = require ("../Models/Course")
const userFilterSubj= require ("../Controller/instructor-controller")
const userFilterRate= require ("../Controller/instructor-controller")


//creatig user 
const createUser = async(req,res) => {
    const newUser = new user ({
        Name: req.body.Name,
        Email: req.body.Email,
        Age: req.body.Age, 
        Gender: req.body.Gender, 
        Birthday: req.body.Birthday, 
        Country: req.body.Country, 
        Password: req.body.Password, 
        PhoneNumber: req.body.PhoneNumber, 
        Type: req.body.Type, 
        Job: req.body.Job,
        FieldOrMajor: req.body.FieldOrMajor,
        University: req.body.University,
        LearningGoal: req.body.LearningGoal,
        PreferredLevel: req.body.PreferredLevel
    }) 
   
        newUser.save()
        .then (result => res.status(200).send(result))
     
    }

//get all users 
function getAllUser (req,res) {
    user.find({}).then (function (user) {
    res.send(user);
    });
};

//filter price if you're individual trainee
const filterCostUser = async (req,res) => {
    let listCost= {};
    if (req.params.Cost && req.params.Type!=="Corporate Trainee"){
        listCost= {Cost: req.params.Cost}
    }
    const filterCostUser= await Course.find(listCost).populate('Cost');
    if (!Course){
     res.status(404).json({success: false})
    }
    res.send(filterCostUser);
    // db.collections.find({ price: { $gte: 50, $lte: 10000 } } ); haga ashal law nef3et 

 }

 //search course name ,subject, instructor
const SearchCourse= async (req,res) => {
        let searchList= await Course.find({
                $or: [
                    { NameOfCourse: { '$regex': req.params.key } },
                    { Subject: { '$regex': req.params.key } } ,
                    {Instructor: req.params.key }  
                  ],
                })
                    res.send(searchList);
}
module.exports={getAllUser, createUser,filterCostUser,SearchCourse };


// // let keyCourses = await Courses.find
 


// let searchList= await Course.find({
//     $or: [
//         { NameOfCourse: { '$regex': req.params.key } },
//         { Subject: { '$regex': req.params.key } } ,
//         {Instructor: {'$regex': req.params.key } }  
//       ],
//     })
    // res.send(searchList);

     // if ( Course.find (
        //     {$or:
        //         [{NameOfCourse:{'$regex':req.query.dsearch}},
        //         {Subject:{'$regex':req.query.dsearch}},
        //         {Instructor:req.query.dsearch} ] } 

        //    ) 
        //    searchList=) 