const Instructor = require("../Models/Instructor");
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
}

//filter price if you're individual trainee
const filterCostUser = async (req,res) => {
    let listCost= {};
    if (req.body.Cost && req.body.Type!=="Corporate Trainee"){
        listCost= {Cost: req.body.Cost}
    }
    const filterCostUser= await Course.find(listCost).populate('Cost');
    if (!Course){
     res.status(404).json({success: false})
    }
    res.send(filterCostUser);
    // db.collections.find({ price: { $gte: 50, $lte: 10000 } } ); haga ashal law nef3et 

 }


 const SearchCourse = async (req,res) => {
   const {NameOfCourse, Subject, Instructor}= req.body;

    try {
        if (NameOfCourse){
            const courses= await Course.find ({'NameOfCourse': {'$regex': NameOfCourse,'$options':'i'}})
                .select('NameOfCourse');
                return res.status(200).json(courses);
        }
        if (Subject){
            const courses= await Course.find ({'Subject': {'$regex': Subject,'$options':'i'}})
                .select('Subject');
                return res.status(200).json(courses);
        }
        if(InstrName){
            const courses = await InstrName.find({'InstrName': {'$regex': InstrName,'$options':'i'}})
            .select('InstrName');
            return res.status(200).json(courses); 
        }
       
    } catch (error) {
         res.status(400).json({error:error.message})
    }
}

module.exports={getAllUser, createUser,filterCostUser,SearchCourse };




 //search course name ,subject, instructor
// const SearchCourse= async (req,res) => {
//         let searchList= await Course.find({
//                 $or: [
//                     { NameOfCourse: { '$regex': req.body.NameOfCourse } },
//                     { Subject: { '$regex': req.body.Subject } } ,
//                     {Instructor: req.body.Instructor }  
//                   ]
//                 })
//                     res.send(searchList);
// }

 


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




         // const {search}= req.body;
    // const nameOfCourse= new RegExp (search,"i");
    // const subject= new RegExp (search, "i");
    // const instr= new RegExp (search,"i");
    // const searchList = await Course.find({
    //      $or:[
    //     { NameOfCourse: {nameOfCourse }},
    //     { Subject: {subject },
    //     {"" : {$in:instr}}
    //     // { Instructor: req.body.Instructor }  
    // ]  
    // },  {Subject:1,  
    //     NameOfCourse:1 , 
    //     CourseSubtitle:1 ,
    //     LevelOfCourse:1 ,  
    //     Summary:1 ,
    //     Rating:1 ,
    //     NoOfViews:1 ,
    //     Cost:1,
    //     _id:1});



     // if (insName){
        //     const instr = await Course.find({});
        //     for (let i = 0; i < instr.length; i++) {
        //       const c1 = instr[i];                
        //       const ins = await Instructor.findById(c1.Instructor)
        //       const instrName=ins.name
        //       if(insName == (instrName)){
        //           res.status(200).json(instr[i].NameOfCourse)
              
        //          } } }


            // res.send(SearchList);

        //  res.json(SearchList);

    //  console.log(SearchList);
     // if (SearchList == null) {
    //     res.status(404).send('not available');
    // }
    // else {
    //     let x= Object.values(SearchList);
    //     //console.log(x);
    //     let result = x.map(SearchList => SearchList.Subject);
    //     console.log(result);
       
    // }

module.exports=getAllUser;

       
   

