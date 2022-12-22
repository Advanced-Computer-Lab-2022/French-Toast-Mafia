const instructor=require("../Models/Instructor");
const course=require("../Models/Course");
const exam = require("../Models/Exams");
const subtitle = require("../Models/Subtitle");
var mongoose = require('mongoose');
const moment = require("moment");
const instrlogin = require("../Controller/user-controller");
const instrlogout = require("../Controller/user-controller");



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

            // get the details from the body of the request

            const{NameOfCourse,
                Summary,
                Subject,
                LevelOfCourse,
                Cost,
                //ExamCourse,
                //CourseCurrency,
                //Promotion,
                Preview} = req.body;

            //create the course
            const createdCourse = await course.create(
                {NameOfCourse,
                //CourseSubtitle,
                Instructor: [instructorId, result.InstrName],
                LevelOfCourse,
                Summary,
                Subject,
                Cost , //CourseCurrency,
                //ExamCourse,
                //Promotion,
                Preview});
    
            //adds the course id to the instructor's courses given array
            await instructor.findByIdAndUpdate(instructorId,{$push:{CourseGiven: createdCourse._id}});
             
            res.status(200).json(createdCourse);
            return createdCourse
        
        }catch(error){
            res.status(400).json({error:error.message})
        }

//    } else{
//     res.status(400).json({error:"Please enter a valid Instructor Id"});
}
    
}

const addInstructorName = async(req, res) =>{
    const courseId = req.query.id;
    instId = "638406b772a816f9a6130b87";
    instName = "Sara sherif";
    c = await course.findByIdAndUpdate({_id: courseId},{Instructor: [mongoose.Types.ObjectId(instId), instName]});
    res.status(200).json(c);
}

const deleteCourse = async (req, res) => {
    const courseId = req.query.id;
    console.log(courseId)
    //Delete the course
    const c = await course.findOneAndDelete({_id:mongoose.Types.ObjectId(courseId)})
        if (c != null){
            console.log(c)
        //remove course from instructor's courses
        console.log(c.Instructor)
        await instructor.findByIdAndUpdate({_id: c.Instructor},{$pull: { CourseGiven: mongoose.Types.ObjectId(courseId) }});
        //remove all subtitles that belong to the course
        console.log(c.CourseSubtitle)
        c.CourseSubtitle.forEach((item, index) => {
            subtitle.findOneAndDelete({_id:mongoose.Types.ObjectId(item)})
          })
        }
       
        res.status(200).json(c)
    
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
    const w = req.query.id;
    if(w){
    const result = await course.find({Instructor:mongoose.Types.ObjectId(w)}).populate('Instructor');
    res.status(200).json(result)
    }
    else{
        res.status(400).json({error:"Instructor Id is required"})
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



const viewInstrInfo = async(req , res) => {
    const instrId = req.query.instrId;
if (instrId) {
    try{
        const result = await instructor.findOne({_id:mongoose.Types.ObjectId(instrId)});
        // get the details of the course 
        const instructorDetails = 
            {"Name": result.InstrName,
            "Email":result.InstrEmail,
            "Country": result.InstrCountry,
            "Biography":result.Biography,
            "Review":result.InstrReview,
        }

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





const addPromotion = async (req, res) => {
    const courseId= req.query.id;
    const {Promotion, StartDatePromotion ,EndDatePromotion} = req.body;
    if (Promotion && StartDatePromotion && EndDatePromotion) {
        try {
            const CurrentPrice = await course.findOne({_id:mongoose.Types.ObjectId(courseId)}).populate("Cost").select("Cost");
            console.log(CurrentPrice.Cost);
            const C=CurrentPrice.Cost;
            const discount= Promotion/100;
            const discountedPrice= C * discount;
            const newPrice= C-discountedPrice;
            console.log(newPrice);
            const endDate= new Date (EndDatePromotion);
            let currentDate = new Date();
            console.log(currentDate);
            const startDate = new Date (StartDatePromotion);
            if ( (endDate >= currentDate) && (currentDate >= startDate)) {
                 const result = await course.findByIdAndUpdate({_id:mongoose.Types.ObjectId(courseId)},{Cost:newPrice, Promotion:req.body.Promotion,StartDatePromotion:req.body.StartDatePromotion,EndDatePromotion:req.body.EndDatePromotion },{new:true});    
                 res.status(200).json(result);
                }
                else {
                    const result = await course.findByIdAndUpdate({_id:mongoose.Types.ObjectId(courseId)},{Cost:C,Promotion:req.body.Promotion,StartDatePromotion:req.body.StartDatePromotion,EndDatePromotion:req.body.EndDatePromotion},{new:true});
                    res.status(200).json(result);
                }
        } catch (error){
            res.status(400).json({error:error.message});
        }
    }
}


 //edit email/ biography req 29
 const editBiography = async (req,res) => {
        const w= req.query.id;
        try{
            const newBio= await instructor.findByIdAndUpdate({_id:mongoose.Types.ObjectId(w)}, {Biography:req.body.Biography}, {new:true});
            res.status(200).json(newBio)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
 }

 
 const editEmail = async (req,res) => {
    const w= req.query.id;
    try{
        const newEmail= await instructor.findByIdAndUpdate({_id:mongoose.Types.ObjectId(w)}, {InstrEmail:req.body.InstrEmail}, {new:true});
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
    const w = req.query.id;
    const a = await instructor.findOne({_id:mongoose.Types.ObjectId(w)}, {InstrReview:1,_id:0 });
   
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

//get instructor course
const viewInstrCourse = async (req , res) => {
    const instrId = req.query.id;
    const resultCourses = [];
if (instrId){
    try{
        const result = await instructor.findOne({_id:mongoose.Types.ObjectId(instrId)}); 
        const courses = result.CourseGiven;
        for (let i = 0; i < courses.length; i++) {
            const c1 = courses[i];
            const c = await course.findById(c1);
            const courseDetails =
                {   "id":c._id,
                    "Name": c.NameOfCourse}
            resultCourses.push(courseDetails);
        }
        res.status(200).json(resultCourses);
        
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
else{
    res.status(404).send('Instructor not found');
}
}


const calculateMoney = async(req , res) => {
    const instrId=req.query.id;
    if (instrId){
        try{
            const result = await instructor.findOne({_id:mongoose.Types.ObjectId(instrId)});
            var sum=0;
            for (let i = 0; i < result.CourseGiven.length; i++) {
                const c1 =result.CourseGiven[i];
               const c = await course.findById(c1);
               sum+=(c.Cost*(result.PercentOrMoneyTaken/100));
               console.log(sum); 
               const r = await instructor.findByIdAndUpdate({_id:mongoose.Types.ObjectId(instrId)},{Wallet:sum});
            }
            res.status(200).json(sum);
        }catch(error){
            res.status(400).json({error:error.message})
        }   
    }
}

module.exports={createInstructor,getAllInstructors , selectCountryInstructor ,
     addCourse , addInstructorName, deleteCourse, filterCost, filterRating, filterSubject, 
     filterCourseSubjcet , filterCourseCost , ViewMyCourses
      , SearchCourse, viewInstrInfo, 
      editBiography, editEmail,ViewMyRatings , ViewMyReview, 
    addInstrRating ,calculateInstrRating,
    deleteInstrRating, createExam, addPromotion,viewInstrCourse, calculateMoney};
   