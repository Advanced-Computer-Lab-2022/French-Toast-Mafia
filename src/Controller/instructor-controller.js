const Course =require("../Models/Course");
//const course = require("../Models/Course");
const InstructorModel=require("../Models/Instructor");
 const mongoose = require ('mongoose');
//const Instructor = require("../Models/Instructor");


const createInstructor = async(req,res) => {
    const newInstructor = new InstructorModel ({
        InstrName: req.body.InstrName,
        InstrEmail: req.body.InstrEmail,
        InstrCountry:req.body.InstrCountry, 
        InstrPassword: req.body.InstrPassword, 
        Department:req.body.Department, 
        Biography:req.body.Biography, 
        CourseGiven:req.body.CourseGiven, 
        ProfileViews:req.body.ProfileViews, 
        PercentOrMoneyTaken:req.body.PercentOrMoneyTaken, 
        Wallet:req.body.Wallet }) 
   
        newInstructor.save()
        .then (result => res.status(200).send(result))
     
    }


function getAllInstructor (req,res) {
    InstructorModel.find({}).then (function (Instructor) {
    res.send(Instructor);
    });
};


    const ViewMyCourses = async (req , res) => {
        const w = req.params.id;
       const a = await Course.find({Instructor:w }, {NameOfCourse:1,_id:0});
           res.json(a);
          console.log(a);
       
       if (a == null) {
           res.status(404).send('no courses available');
       }
       else {
           let x= Object.values(a);
           //console.log(x);
           let result = x.map(a => a.NameOfCourse);
           console.log(result);
          
       }

    }
    
    const SearchCourse = async (req,res) => {
        const w = req.params.id;
        const a = await Course.find({
            Instructor:w , 
            
            $or:[
            { NameOfCourse: {'$regex': req.body.NameOfCourse }},
            { Subject: {'$regex': req.body.Subject} },

        ] 
        
        },  

         {Subject:1,  NameOfCourse:1 , CourseSubtitle:1,LevelOfCourse:1,  Summary:1,Rating:1,NoOfViews:1,Cost:1,_id:0});
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
        const a = await Course.find({Instructor:w ,Subject:{'$regex': req.body.Subject}}, {Subject:1,_id:0});
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
        const a = await Course.find({Instructor:w ,
            minPrice: { $lte: {price: req.body.price}}, 
             maxPrice: { $gte: {price: req.body.price}}}, 
            {NameOfCourse:1,Cost:1,_id:0});
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




   



//Creating a Course
const addCourse = async(req , res) => {
   

    const Instructor = req.params.id;    

   //check if the Instructor exists first (this check will probably be removed when authentication is implemented)
   const result = await InstructorModel.findOne({_id:mongoose.Types.ObjectId(Instructor)});
   //const result=1;
   if(result !== null){
        try{
            const course = await Course.create(
                {NameOfCourse : req.body.NameOfCourse,
                CourseSubtitle : req.body.CourseSubtitle,
                Instructor ,
                LevelOfCourse : req.body.LevelOfCourse,
                Summary : req.body.Summary,
                Subject : req.body.Subject,
                Rating : req.body.Rating,
                NoOfViews : req.body.NoOfViews,
                Cost : req.body.Cost});

           // res.status(200).json(result);

            //adds the course id to the instructor's courses given array
            await InstructorModel.findByIdAndUpdate(Instructor,{$push:{CourseGiven: course._id}},{new : true});

            //in case you need to remove a course (1 removes the last element in the array)
            // await instructorModel.findByIdAndUpdate(Instructor,{$pop: { CourseGiven: 1 }});

            res.status(200).json("Course Added");


        }catch(error){
            res.status(400).json({error:error.message})
        }
   } else{
    res.status(400).json({error:"Please enter a valid Instructor Id"});
}
    
}
      

module.exports= {getAllInstructor , createInstructor , filterCourseSubjcet , filterCourseCost , addCourse , ViewMyCourses , SearchCourse} 
