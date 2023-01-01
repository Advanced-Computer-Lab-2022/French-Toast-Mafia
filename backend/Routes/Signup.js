const express= require("express");

const router = express.Router();

const { User, validate3 } = require("../Models/User");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
	try {
		const { error } = validate3(req.body);
		// console.log("no1-----------------------------------------------------------")
		if (error)
			return res.status(400).send({ message: error.details[0].message });	
		const user = await User.find({ Email: req.body.Email });
		console.log(user);
		// console.log("no2-----------------------------------------------------------")

		if (user.length!=0)
			return res.status(409).send({ message: "User with given email already Exist!" });
				
		// console.log("no3-----------------------------------------------------------")
        const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(req.body.Password, salt);
		// console.log("tetettetetetetteteteetetetetet")
		await new User({Name:req.body.Name, Email:req.body.Email ,Password: hashPassword, Gender:req.body.Gender}).save();
		// const newUser= new User({ Email:Email, Password: hashPassword , Gender: Gender});
		// newUser.save().then(result => res.status(200).send(result));

		// console.log(newUser);
        // const token = createToken(newUser.Email);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        // res.status(200).json(newUser);
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// 	if (error){
// 		return res.status(400).send({ message: error.details[0].message });
// 		 }
// 	const instr = await Instructor.find({ InstrEmail: req.body.InstrEmail });
// 	console.log(instr);

// 	if (!(instr.length ==0)){
// 		return res.status(409).send({ message: "Instructor has already an account..!" });
// 	}       
// 	console.log("mayar");
		 
// 	const salt = await bcrypt.genSalt();
// 	// console.log("mayar");
// 	const hashedPassword = await bcrypt.hash(req.body.InstrPassword, salt);

// 	const newInstr = new Instructor({ InstrEmail: req.body.InstrEmail, InstrPassword: hashedPassword });
// 		newInstr.save().then(result => res.status(200).send(result))
	
// 	// res.status(200).json(newInstr);
// 	// res.status(201).send({ message: "Instructor added successfully and request accepted!" });
	
// 	} catch(err) {
// 		res.status(500).send({ message: "server failed.." });
// 		console.log(err);
// 	}


module.exports=router;

// const signUp = async (req, res) => {
//     const { Name, Email, Password, Type, Gender } = req.body;
//     try {
//         const salt = await bcrypt.genSalt();        //hash password beha 
//         const hashedPassword = await bcrypt.hash(Password, salt);       
//         const newuser = await user.create({ Name: Name, Email: Email, Password: hashedPassword, Type: Type, Gender: Gender});
//         const token = createToken(newuser.Name);

//         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//         res.status(200).json(newuser)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }