const instructor=require("../Models/Instructor");
const course=require("../Models/Course");
const exam = require("../Models/Exams");
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

    const instructorId = req.query.id;
   
   //check if the Instructor exists first (this check will probably be removed when authentication is implemented)
   const result = await instructor.findOne({_id:mongoose.Types.ObjectId(instructorId)});
   if(result !== null){
        try{

            //Uncomment this block to delete a course
            /*
            course.deleteOne({ NameOfCourse: 'DMET 401' }, function (err) {
                if(err) console.log(err);
                console.log("Successful deletion");
              });
            await instructor.findByIdAndUpdate(instructorId,{$pop: { CourseGiven: 1 }});
            */
            // get the details from the body of the request

            const{NameOfCourse,
                CourseSubtitle,
                Summary,
                Subject,
                LevelOfCourse,
                Cost,
                CourseCurrency,
                Promotion,
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
                ExamCourse,
                Promotion,
                StartDatePromotion,
                EndDatePromotion,
                Preview});
    
            //adds the course id to the instructor's courses given array
            await instructor.findByIdAndUpdate(instructorId,{$push:{CourseGiven: createdCourse._id}});
             
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

//instructor create an exam req 26
const createExam = async (req,res) => {
    const instrId=req.query.id;
    const mcq = [
        {
        question: req.body.question,
        choice1: req.body.choice1,
        choice2: req.body.choice2,
        choice3: req.body.choice3,
        choice4: req.body.choice4,
        correct: req.body.correct,
        },
    ];
    const newExam= new exam ({
        title: req.body.title,
        description: req.body.description,
        mcq: mcq,
    });
    newExam.save().then((result) => res.status(200).send(result));

    instructor.findOneAndUpdate({_id:mongoose.Types.ObjectId(instrId)}, { Exam: newExam._id }, { new: true });
            
}

//add exam id into instructor schema
// const addExamId = async (req,res) => {
//     const instrId=req.query.id;
//     const examId= req.body;

//     if (instrId){
//         try{
//             const result = await instructor.findOneAndUpdate({_id:mongoose.Types.ObjectId(instrId)}, { Exam: mongoose.Types.ObjectId(examId) }, { new: true });
//             res.status(200).json(result);
//         }catch(error){
//             res.status(400).json({error:error.message})
//         }
// }
// }

// find mcq by instructor id 
const getAllMcq = async (req,res) => {
    const instrId= req.query.id;
    const allMcq=[];
        if (instrId){
            try{
                const resInstr= await instructor.findOne({_id:mongoose.Types.ObjectId(instrId)} );
                if (resInstr){
                    const resExam= await exam.findOne({_id:mongoose.Types.ObjectId(resInstr.Exam)} );
                    if (resExam){
                        allMcq.push(resExam.mcq);
                    }
                 }
                 res.status(200).json(allMcq);
            }catch {
            res.status(400).json({error:error.message})
            }
    }
};

const addMCQ = async (req,res) => {
    const ExamId= req.query.id;
   if (ExamId){
    const mcq = [
        {
        question: req.body.question,
        choice1: req.body.choice1,
        choice2: req.body.choice2,
        choice3: req.body.choice3,
        choice4: req.body.choice4,
        correct: req.body.correct,
        }
    ];
   const result= await exam.findByIdAndUpdate(ExamId, { $push: { mcq: mcq } }, { new: true });
   res.status(200).send('your question has been added');
}
else{
    res.status(400).json({error:"Please provide the exam id"});
}
    
}

 //edit email/ biography req 29
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



// View Instructor  ratings req 28
const ViewMyRatings = async (req , res) => {
    const w = req.params.id;
    const a = await instructor.find({instructor:w }, {InstrRating:1,_id:1});
     
    if (a == null) {
        res.status(404).send('no instructors available');
    }
    else {
        res.json(a);  
    }
} 
// View Instructor reviews
const ViewMyReview = async (req , res) => {
    const w = req.params.id;
    const a = await instructor.find({instructor:w }, {InstrReview:1,_id:1});
   
    if (a == null) {
        res.status(404).send('no instructors available');
    }
    else {
        res.json(a);
    }
}


const deleteInstrRating = async(req , res) => {
    const instrId=req.query.id;
    const emp=[];
    if (instrId){
        try{
            const result = await instructor.findOneAndUpdate({_id:mongoose.Types.ObjectId(instrId)}, { InstrRating: emp }, { new: true });
            res.status(200).json(result);
        }catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

//add course rating function
const addInstrRating = async(req , res) => {
    const instrId=req.query.id;
    const userId=req.body.id;
    const rating=req.body.rating;
    const uId=mongoose.Types.ObjectId(userId);
    const tuple={uId,rating};
    if (instrId){
        try{
            //check if the user has already rated the instructor
            const check = await instructor.findOne({_id:mongoose.Types.ObjectId(instrId), InstrRating:{$elemMatch:{uId:uId}}});
            if (!check){
            const resCourse = await instructor.findOneAndUpdate({_id:mongoose.Types.ObjectId(instrId)}, { $push: { InstrRating: tuple } }, { new: true });
            res.status(200).json(resCourse);
            }
            else{
                res.status(400).json({error:"You have already rated the instructor"});
            }

        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

//calculate rating function
const calculateInstrRating = async(req , res) => {
    const instrId=req.query.id;
    if (instrId){
        try{
            const result = await instructor.findOne({_id:mongoose.Types.ObjectId(instrId)});
            var sum=0;
            for (let i = 0; i < result.InstrRating.length; i++) {
                sum+=parseInt(result.InstrRating[i].rating);
            }
            const avg=sum/result.InstrRating.length;
            res.status(200).json(avg);
        }catch(error){
            res.status(400).json({error:error.message})
        }   
    }
}


module.exports={createInstructor,getAllInstructors , selectCountryInstructor ,
     addCourse , filterCost, filterRating, filterSubject, 
     filterCourseSubjcet , filterCourseCost , ViewMyCourses
      , SearchCourse, viewInstrInfo, 
    editBiography, editEmail,ViewMyRatings , ViewMyReview, addInstrRating ,calculateInstrRating,
    deleteInstrRating, createExam, addMCQ, getAllMcq};
   