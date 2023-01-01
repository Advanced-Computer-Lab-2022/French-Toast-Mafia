const {Admin, validate1} = require("../Models/Admin");
const Course = require ("../Models/Course");
const mongoose = require('mongoose');
const {Instructor,validate2} = require("../Models/Instructor");

const {User} = require("../Models/User");

const adminLogout= require("../Controller/user-controller");

const bcrypt = require("bcrypt");


function getAllAdmin (req,res) {
   let x= Admin.find({}).then (function (admin) {
    res.send(admin);
    });
};

const createAdmin = async(req,res) => {  //add administrator
        
    var name = req.body.AdminName;
    var id = req.body.AdminId;

        let findAdmin= await Admin.findOne({AdminName: name })
        if(!findAdmin){
            try{ const admin = await Admin.create(
                { AdminName:name ,
                  AdminId: id,
    
                }
            )
            return res.status(200).json({Message: "Admin is added successfully!"});
           }
           catch(err){
            return console.log(err);
           }
            
        }
        else{
            return res.status(401).json({Message: "Admin is already registered!"});

        }
       
    }

const createInstructor = async(req,res) => {  //add instructors

    try {
		const { error } = validate2(req.body);
		if (error){
			return res.status(400).send({ message: error.details[0].message });
             }
		const instr = await Instructor.find({ InstrEmail: req.body.InstrEmail });
        console.log(instr);

        if (!(instr.length ==0)){
            return res.status(409).send({ message: "Instructor has already an account..!" });
        }       
        console.log("mayar");
             
        const salt = await bcrypt.genSalt();
        // console.log("mayar");
        const hashedPassword = await bcrypt.hash(req.body.InstrPassword, salt);

        const newInstr = new Instructor({ InstrEmail: req.body.InstrEmail, InstrPassword: hashedPassword });
            newInstr.save().then(result => res.status(200).send(result))
        
        // res.status(200).json(newInstr);
		// res.status(201).send({ message: "Instructor added successfully and request accepted!" });
        
        } catch(err) {
            res.status(500).send({ message: "server failed.." });
            console.log(err);
        }
    } 


const createCorporateTrainess = async(req,res) => { //Requirement 3

    var name=req.body.Name;
    var email=req.body.Email;
    var password=req.body.Password;
    var type=req.body.Type;
    var gender=req.body.Gender;

    
    if( type ==  "Corporate"){
        try{ const corporateTrainees = await User.create(
            {
             Name: name,
             Email:email ,
             Password: password,
             Type: type,
             Gender: gender

            } )
        }
        catch(err){
            return console.log(err);
        }
        return res.status(202).json({Message: "Corporate trainee is added successfully!"})
    }
    else{
     return res.status(401).json({Message: "invalid user!"});
     }
}
 // add Promotion for all courses 

     const addPromotionAll = async (req, res) => {
    const {Promotion, StartDatePromotion ,EndDatePromotion} = req.body;
    console.log("hiiiiiiiiiiiiii");
     if (Promotion && StartDatePromotion && EndDatePromotion) {
        try {
            console.log("hiiiiiiiiiiiiii");
            const CurrentPrice = await Course.find({}).populate("Cost").select("Cost");
            console.log(CurrentPrice);
            let result;
            for( let i =0;i<CurrentPrice.length ;i++){
            const C=CurrentPrice[i].Cost;
            console.log(C);
            console.log(CurrentPrice[i]._id);
            const discount= Promotion/100;
            const discountedPrice= C * discount;
            const newPrice= C-discountedPrice;
            const endDate= new Date (EndDatePromotion);
            let currentDate = new Date();
            console.log(currentDate);
            const startDate = new Date (StartDatePromotion);
            if ( (endDate >= currentDate) && (currentDate >= startDate)) {
                 result = await Course.findByIdAndUpdate({_id:mongoose.Types.ObjectId(CurrentPrice[i]._id)},{Cost:newPrice, Promotion:req.body.Promotion,StartDatePromotion:req.body.StartDatePromotion,EndDatePromotion:req.body.EndDatePromotion },{new:true});    
                 // res.status(200).json(result);
               }
               else {
                 result = await Course.findByIdAndUpdate({_id:mongoose.Types.ObjectId(CurrentPrice[i]._id)},{Cost:C,Promotion:req.body.Promotion,StartDatePromotion:req.body.StartDatePromotion,EndDatePromotion:req.body.EndDatePromotion},{new:true});
                  // res.status(200).json(result);
               }
            }
            res.status(200).json(result);
     
        } 
       
         catch (error){
            res.status(400).json({error:error.message});
        }
    }
    //res.status(400).json({error:error.message});
}



    





  
//   let existinginstructor;
//         try{
//             existinginstructor= await Instructor.findOne({InstrEmail});
             
//          }
//      catch(err){
//         if (existinginstructor){
//             return res.status(400).json({Message: "Admin is already registered!"})
//         }
//         return console.log(err);

//   }
     
     

      



//       let existingAdmin; 
    //  try{
    //            existingAdmin= await Admin.findOne({AdminName})
                
               
    //     }
    //     catch(err){
    //       return console.log(err);
    //     }

    //      if (existingAdmin){
    //          return res.status(400).json({Message: "Admin is already registered!"})
    //      }
//          const admin = new Admin({
//             AdminName, 
//             AdminId
//          })
//          try{
//             await admin.save();
//          }
//          catch(err){
//             return console.log(err);
//           }
//          return res.status(200).json({admin});
         
        

//  };
 


//  const createAdmin = async (req,res) => {
    //const AdminName = req.body.AdminName;
    //const AdminId = req.body.AdminId;
    // let existingInstructor={};
    //if (req.params.AdminName && req.params.AdminId){
     //       res.status(404).json({message:"instructor is already in use!!"})
    //}
    //const createInstructor = await instructor.create({InstrEmail: InstrEmail, InstrPassword:InstrPassword})
    //const createAdmin = await admin.create({AdminName: AdminName, AdminId: AdminId})
    //res.send('added successfully')
    //  const AdminName= req.body.AdminName; 
    //  const AdminId  =req.body.AdminId ;
    //  let existingAdmin;
    //  try{
    //        existingAdmin= await instructor.findOne({AdminName});
    //  }
    //  catch(error){
    //      console.log(error);
    //  }
    //  if (existingAdmin){
    //      return res.status(400).json({Message: "Admin is already registered!"})
    //  }
    //  const admin=new admin({
    //      AdminName , 
    //      AdminId
    //  });
    //  try{
    //      await  Admin.save();
    //  }catch(error){
    //      console.log(error);
    //  }
    //  return res.status(200).json({admin});
    // }
 
  //const existInstructor = new instructor({ 
    //     InstrEmail: req.body.InstrEmail,
    //     InstrPassword : req.body.InstrPassword
    // })

//}

module.exports={ getAllAdmin, createAdmin, createInstructor, createCorporateTrainess, addPromotionAll};
