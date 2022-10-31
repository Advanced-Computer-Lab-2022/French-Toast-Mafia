const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const intructorSchema = new Schema({
    InsrtName: {
      type: String,
      required: true
    },
    InstrId: {
      type: Number,
      required: true,
      unique: true
    },
    InstrEmail: {
      type: String,
      required: true,
      unique: true
    },
    InstrCountry: {
      type: String,
      required: true
    },
    InstrPassword: {
      type: String,
      required: true,
      minlength: 8
    },
    Department: {
      type: String,
      required: true
    },
    Biography: {
      type: Number,
      required: true
    },
    CourseGiven: {
      type: String,
      required: true
    },
    ProfileViews: {
      type: Number,
      required: false
    },
    PercentOrMoneyTaken: {
      type: Number,
      required: true
    },
    Wallet: {
      type: Number,
      required: true
    }
    
  }, { timestamps: true });
  
  const Instructor = mongoose.model('Instructor', instructorSchema);
  module.exports = Instructor;