const Admin = require("../Models/Admin");
const Instructor= require("../Models/Instructor");
const User= require("../Models/User");


function getAllAdmin (req,res) {
   let x= Admin.find({}).then (function (admin) {
    res.send(admin);
    });
};

const createAdmin = async(req,res) => {  //add administrator
        
    var name = req.body.AdminName;
    var id = req.body.AdminId;
     var country= req.body.AdminCountry;

        let findAdmin= await Admin.findOne({AdminName: name })
        if(!findAdmin){
            try{ const admin = await Admin.create(
                { AdminName:name ,
                  AdminId: id,
                  AdminCountry: country
    
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
      
        var name=req.body.InsrtName;
        var id= req.body.InstrId;
        var email = req.body.InstrEmail;
        var country= req.body.InstrCountry;
        var password = req.body.InstrPassword;
        var department=req.body.Department;
        var biography=req.body.Biography;
        var coursegiven=req.body.CourseGiven;
        var profileviews=req.body.ProfileViews;
        var percentOrMoneyTaken=req.body.PercentOrMoneyTaken;
        var wallet=req.body.Wallet;

        
    try{ const instructor = await Instructor.create(
       {
        InsrtName: name,
        InstrId: id,
        InstrEmail:email ,
        InstrCountry: country,
        InstrPassword: password,
        Department:department,
        Biography:biography,
        CourseGiven: coursegiven,
        ProfileViews: profileviews,
        PercentOrMoneyTaken: percentOrMoneyTaken,
        Wallet: wallet
        }
    )
   return res.status(200).json({Message: "Instructor is added successfully!"});
  }
  catch(err){
   return console.log(err);
  }
} 

  

const createCorporateTrainess = async(req,res) => { //Requirement 3

    var name=req.body.Name;
    var email=req.body.Email;
    var age=req.body.Age;
    var gender= req.body.Gender;
    var birthday=req.body.Birthday;
    var country=req.body.Country;
    var password=req.body.Password;
    var phonenumber=req.body.PhoneNumber;
    var type=req.body.Type;
    var job = req.body.Job;
    var fieldormajor=req.body.FieldOrMajor;
    
    if( type == "corporate trainee"){
        try{ const corporateTrainees = await User.create(
            {
             Name: name,
             Email:email ,
             Age: age ,
             Gender: gender,
             Birthday: birthday,
             Country: country,
             Password: password,
             PhoneNumber: phonenumber,
             Type: type,
             Job: job,
             FieldOrMajor: fieldormajor
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

module.exports={ getAllAdmin, createAdmin, createInstructor, createCorporateTrainess};
