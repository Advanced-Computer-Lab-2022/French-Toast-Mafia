const {User}= require("../Models/User");
const mongoose = require('mongoose');
const Card = require("../Models/Card");


const getAllData= async (req, res) =>{
    Exams.find({}).then (function (Card) {
        res.status(200).json(Card)
        });
};


const addCard = async(req,res) => {  //add card data
      
//     var Name=req.body.CardName;
//     var Number = req.body.CardNumber;
//     var Cvc = req.body.CardCvc;
//     var Expiry = req.body.CardExpiry;

    
//    try{ const card = await Card.create(
//    {
//     CardName: Name,
//     CardNumber: Number ,
//     CardCvc: Cvc,
//     CardExpiry: Expiry

//    }
// )
//     return res.status(200).json({Message: "Card is added successfully!"});
// }

//    catch(err){
//      return console.log(err);
//    }
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount
    });
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });

} 





module.exports= {getAllData, addCard};
