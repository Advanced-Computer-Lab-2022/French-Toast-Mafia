const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const intructorSchema = new Schema({
    InsrtName: {
      type: String,
      required: true
    },
    //removed instructor id since it gets automatically added by mongoDB
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
  
  const Instructor = mongoose.model('Instructor', intructorSchema);
  module.exports = Instructor;