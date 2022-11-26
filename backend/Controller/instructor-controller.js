const instructor=require("../Models/Instructor");
const course=require("../Models/Course");
var mongoose = require('mongoose');

function getAllInstructors (req,res) {
    instructor.find({}).then (function (instructor) {
    res.send(instructor);
    });
};


const createInstructor = async(req,res) => {
    const newInstructor = new instructor ({
        InstrName: req.body.InstrName,
        InstrEmail: req.body.InstrEmail,
        InstrCountry:req.body.InstrCountry, 
        InstrPassword: req.body.InstrPassword, 
        Department:req.body.Department, 
        Biography:req.body.Biography, 
        CourseGiven:req.body.CourseGiven, 
        ProfileViews:req.body.ProfileViews, 
        PercentOrMoneyTaken:req.body.PercentOrMoneyTaken, 
        Wallet:req.body.Wallet,
        Currency:req.body.Currency,
        InstrReview:req.body.InstrReview,
        InstrRating:req.body.InstrRating}) 
   
        newInstructor.save()
        .then (result => res.status(200).send(result))
     
    }


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

//Requirement 23 --> add a new course
const addCourse = async(req , res) => {
    //fill in all the required course details (that an instructor should fill when creating it)

    const instructorId = req.params.id;
   
   //check if the Instructor exists first (this check will probably be removed when authentication is implemented)
   const result = await instructor.findOne({_id:mongoose.Types.ObjectId(instructorId)});
   if(result !== null){
        try{

            //Uncomment this block to delete a course
            /*
            course.deleteOne({ NameOfCourse: 'FinallyWorking' }, function (err) {
                if(err) console.log(err);
                console.log("Successful deletion");
              });
            */

            // get the details from the body of the request
            const{NameOfCourse,
                CourseSubtitle,
                Summary,
                Subject,
                LevelOfCourse,
                Cost,
                CourseCurrency,
                Exams,
                DurationDiscount,
                Preview} = req.body;

            //create the course
            const createdCourse = await course.create(
                {NameOfCourse,
                CourseSubtitle,
                Instructor: instructorId,
                LevelOfCourse,
                Summary,
                Subject,
                Cost , CourseCurrency,
                Exams,
                DurationDiscount,
                Preview});
    
            //adds the course id to the instructor's courses given array
            await instructor.findByIdAndUpdate(instructorId,{$push:{CourseGiven: createdCourse._id}});

            //in case you need to remove a course (1 removes the last element in the array)
            // await instructor.findByIdAndUpdate(instructorId,{$pop: { CourseGiven: 1 }});
             
            res.status(200).json(createdCourse);
            
        
        }catch(error){
            res.status(400).json({error:error.message})
        }

   } else{
    res.status(400).json({error:"Please enter a valid Instructor Id"});
}
    
}

//filter courses based on subject
const filterSubject = async (req,res) => {
    let filtersubj= {};
    if (req.body.Subject){
         filtersubj= {Subject: req.body.Subject}
    }
    const courseSubj= await Course.find(filtersubj).populate('Subject');
    if (!course){
     res.status(404).json({success: false})
    }
    res.send(courseSubj);
 
 }
 
 //filter rating 
 const filterRating = async (req,res) => {
     let filterRate= {};
     if (req.body.Rating){
         filterRate= {Rating: req.body.Rating}
     }
     const courseRate= await Course.find(filterRate).populate('Rating');
     if (!course){
      res.status(404).json({success: false})
     }
     res.send(courseRate);
  
  }
 
  //filter price 
  const filterCost = async (req,res) => {
     let listCost= {};
     if (req.body.Cost){
         listCost= {Cost: req.body.Cost}
     }
     const filterCost= await course.find(listCost).populate('Cost');
     if (!course){
      res.status(404).json({success: false})
     }
     res.send(filterCost);
  
  }

  const ViewMyCourses = async (req , res) => {
    const w = req.params.id;
    const a = await course.find({instructor:w }, {NameOfCourse:1,_id:1});
        // res.json(a);
        // console.log(a);
    
    if (a == null) {
        res.status(404).send('no courses available');
    }
    else {
        res.json(a);
        //let x= Object.values(a);
        //console.log(x);
        //let result = x.map(a => a.NameOfCourse);
        // console.log(result);
        
    }

}

const SearchCourse = async (req,res) => {
    const w = req.params.id;
    const a = await course.find({
        Instructor:w , 
        
        $or:[
        { NameOfCourse: {'$regex': req.body.NameOfCourse }},
        { Subject: {'$regex': req.body.Subject} },

    ] 
    
    },  

     {Subject:1,  NameOfCourse:1 , CourseSubtitle:1,LevelOfCourse:1,  Summary:1,Rating:1,NoOfViews:1,Cost:1,_id:1});
      res.json(a);
     console.log(a);
    
    if (a == null) {
        res.status(404).send('no courses available');
    }
    else {
        let x= Object.values(a);
        //console.log(x);
        let result = x.map(a => a.Subject);
        console.log(result);
       
    }
}



 const filterCourseSubjcet = async (req,res) => {
    const w = req.params.id;
    //const y = req.params.Subject;
    const a = await course.find({instructor:w ,Subject:{'$regex': req.body.Subject}}, {Subject:1,_id:1});
      res.json(a);
     console.log(a);
    
    if (a == null) {
        res.status(404).send('no courses available');
    }
    else {
        let x= Object.values(a);
        //console.log(x);
        let result = x.map(a => a.Subject);
        console.log(result);
       
    }
}


const filterCourseCost = async (req,res) => {
    const w = req.params.id;
   // const y = req.params.Cost;
    const a = await course.find({Instructor:w ,
        minPrice: { $lte: {price: req.body.price}}, 
         maxPrice: { $gte: {price: req.body.price}}}, 
        {NameOfCourse:1,Cost:1,_id:1});
      res.json(a);
     console.log(a);
    
    if (a == null) {
        res.status(404).send('no courses available');
    }
    else {
        let x= Object.values(a);
        //console.log(x);
        let result = x.map(a => a.Cost);
        console.log(result);
       
    }
}
// const filteByPrice = async (req,res)=>
// {try{
//     const priceRange = await courses.find({ 
//         minPrice: { $lte: {price: req.body.price}}, 
//         maxPrice: { $gte: {price: req.body.price} }
//      })
//      res.status(200).json(priceRange)
//     }
//     catch(error){ 
//         res.status(400).json({error:error.me})
//     }
// }
// const filterCourseSubjcet = async (req,res) => {
//     let filtersubject={};
//     if (req.params.Subject) {
//         filtersubject= { Subjcet : req.params.Subject}

//    }

//    const subjectlist = await Course.find (filtersubject).populate('Subject');
//    if (!subjectlist){
//     res.status(404).json({success:false})
// }
// res.send(subjectlist);
// }


//     const SearchCourse= async (req,res) => {
//         const w = req.params.id;
//         let searchList= await Course.find(
//             {Instructor:w}, 
        // {$or: [
        //         { NameOfCourse:{'$regex': req.body.NameOfCourse } },
        //         { Subject: {'$regex': req.body.Subject} }
        //     ] })

//                 res.send(searchList);
// }

const viewInstrInfo = async(req , res) => {
    const instrId = req.query.id;
if (instrId) {
    try{
        const result = await instructor.findOne({_id:mongoose.Types.ObjectId(instrId)});
        // get the details of the course 
        const instructorDetails = 
            {"Name": result.InstrName,
            "Email":result.InstrEmail,
            "Password": result.InstrPassword}

        res.status(200).json(instructorDetails);
        
    
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
else{
    res.status(400).json({error:"Please provide the instructor id"})
}

}

const changeInstrPassword = async(req, res) => {

     const instrId = req.query.id;
     const {InstrPassword} = req.body;
     try{
         const instructorPassword = await instructor.findByIdAndUpdate(instrId, {InstrPassword:InstrPassword}, {new:true});
         res.status(200).json(instructorPassword)
     }
     catch(error){
         res.status(400).json({error:error.message})
     }
 }

 //edit email/ biography 
 const editBiography = async (req,res) => {
        const instructorId= req.params.id;
        const {Biography}= req.body;
        try{
            const newBio= await instructor.findByIdAndUpdate(instructorId, {Biography:Biography}, {new:true});
            res.status(200).json(newBio)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
 }
 const editEmail = async (req,res) => {
    const instructorId= req.params.id;
    const {InstrEmail}= req.body;
    try{
        const newEmail= await instructor.findByIdAndUpdate(instructorId, {InstrEmail:InstrEmail}, {new:true});
        res.status(200).json(newEmail)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
// View Instructor  ratings
const ViewMyRatings = async (req , res) => {
    const w = req.params.id;
    const a = await instructor.find({instructor:w }, {InstrRating:1,_id:1});
        // res.json(a);
        // console.log(a);
    
    if (a == null) {
        res.status(404).send('no instructors available');
    }
    else {
        res.json(a);
        //let x= Object.values(a);
        //console.log(x);
        //let result = x.map(a => a.NameOfCourse);
        // console.log(result);
        
    }

} // View Instructor reviews
const ViewMyReview = async (req , res) => {
    const w = req.params.id;
    const a = await instructor.find({instructor:w }, {InstrReview:1,_id:1});
        // res.json(a);
        // console.log(a);
    
    if (a == null) {
        res.status(404).send('no instructors available');
    }
    else {
        res.json(a);
        //let x= Object.values(a);
        //console.log(x);
        //let result = x.map(a => a.NameOfCourse);
        // console.log(result);
        
    }

}
// create Exam
// const createExam = async (req , res) => {
//     const w = req.params.id;
//     const x = req.body;
//     const a = await course.find({instructor:w , NameOfCourse:x}, {
//         Exams.push(),_id:1});
//         // res.json(a);
//         // console.log(a);
    
//     if (a == null) {
//         res.status(404).send('no instructors available');
//     }
//     else {
//         res.json(a);
//         //let x= Object.values(a);
//         //console.log(x);
//         //let result = x.map(a => a.NameOfCourse);
//         // console.log(result);
        
//     }





module.exports={createInstructor,getAllInstructors , selectCountryInstructor ,
     addCourse , filterCost, filterRating, filterSubject, 
     filterCourseSubjcet , filterCourseCost , ViewMyCourses
      , SearchCourse, viewInstrInfo, changeInstrPassword,
    editBiography, editEmail,ViewMyRatings , ViewMyReview};
   