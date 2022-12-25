const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  token: {
    type: String,
    required: false
  },amount: {
    type: String,
    required: false
  },
    CardName: {
      type: String,
      required: true
    },
    CardNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 16
    },
    CardCvc: {
      type: Number,
      required: true,
      maxlength: 3
    },
    CardExpiry: {
      type: Date,
      required: true,
      maxlength: 4
     },
    
     users: {
      type: mongoose.Types.ObjectId,
      ref:'User',
      required: false
    }
    
  }, { timestamps: true });
  
  const Card = mongoose.model('Card', cardSchema);
  module.exports = Card;