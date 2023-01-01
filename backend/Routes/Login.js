const express= require("express");

const router = express.Router();
const { User, validate3} = require("../Models/User");
const {Instructor, validate2} = require("../Models/Instructor");
const {Admin, validate1} = require("../Models/Admin");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		const {Email, Password}=req.body;
		console.log("1----------------------------------------------------------------------")
		if (error )
			return res.status(400).send({ message: error.details[0].message });

		var user = await User.findOne({ Email: req.body.Email });
		console.log("2----------------------------------------------------------------------")
		console.log(user);

		if (!user){
			user= await Instructor.find({ InstrEmail: Email});
		}
		console.log(user)
		console.log("3----------------------------------------------------------------------")


		if (!user){
			user= await Admin.findOne({ AdminName: req.body.AdminName });
		}
		console.log("4----------------------------------------------------------------------")

		console.log(user);
		console.log(Password);
		console.log("5----------------------------------------------------------------------")
		console.log(user.Password)

		const validPassword = await bcrypt.compare(
			Password,
			user.Password
		);
		console.log("6----------------------------------------------------------------------")

		if (!validPassword) 
			return res.status(401).send({ message: "Invalid Email or Password" });
	
		const token = user.generateAuthToken();
		 return res.status(200).send({ data: token, message: "logged in successfully",userid:user._id });
	} catch (error) {

		return res.status(500).send({ message: "Internal Server Error" });
		console.log(error);
	}
});


const validate = (data) => {
	const schema = Joi.object({
		Email: Joi.string().email().required().label("Email"),
		Password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


module.exports=router;
// const {Email, Password} = req.body;
// 	console.log("1-----------------------------------------------------------")
// 	try{
// 		var flag=0;
// 		const user= await Instructor.find({Email})
// 		const user1=await Instructor.find({Email})
// 		console.log(user)
// 		console.log(user1)
// 		console.log("2-----------------------------------------------------------")

// 		if(user){
// 			m= await Instructor.findOne({Email})
// 			z=await Instructor.findOne({Email},'FirstTime')
// 		}
// 		console.log("3-----------------------------------------------------------")

// 		if (!user){
// 			user= await User.findOne({Email})
// 			flag=1
// 		}
// 		console.log("4-----------------------------------------------------------")
// 		if (!user){
// 			user= await Admin.findOne({Email})
// 			flag=2
// 		}
// 		console.log("5-----------------------------------------------------------")
// 		if (user && bcrypt.compareSync(Password, user.Password)){
// 			id=user._id;
// 		console.log("6-----------------------------------------------------------")

// 			session=req.session;
// 		console.log("7----------------------------------------------------------")

//           	session.userid=Email;
// 		console.log("8-----------------------------------------------------------")
//           	const token = createToken(user.Email);
// 		console.log("9-----------------------------------------------------------")
// 			res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
// 			if(user1){
// 				if(z.FirstTime==true){
// 				flag=3;
// 			   	res.json(`/instructor/${m._id}`);
// 			   	await Instructor.findOneAndUpdate({Email},{FirstTime:false})
// 			  }}
// 			if (flag==0)
// 				res.json(`/instructor/${id}`);  
// 			if (flag==1)
// 			  	res.json(`/user/${id}`);
// 			if (flag==2)
// 			  res.json(`/admin/${id}`);

// 		}else {
// 			console.log(user)
// 			 res.status(200).json({ message: "Invalid Credentials" });
// 		  }

// 	} catch (error) {
// 		 res.status(400).json({ error: error.message })
// 	}

// });