const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const intructorSchema = new Schema({
    InstrName: {
      type: String,
      required: true
    },
    InstrEmail: {
      type: String,
      required: true,
      unique: true
    },
    InstrCountry: {
      type: String,
      required: false
    },
    InstrPassword: {
      type: String,
      required: true,
      minlength: 8
    },
    Department: {
      type: String,
      required: false
    },
    Biography: {
      type: Number,
      required: false
    },
    CourseGiven: {
      type: String,
      required: false
    },
    ProfileViews: {
      type: Number,
      required: false
    },
    PercentOrMoneyTaken: {
      type: Number,
      required: false
    },
    Wallet: {
      type: Number,
      required: false
    }
  }, { timestamps: true });
  
  const Instructor = mongoose.model('Instructor', intructorSchema);
  module.exports = Instructor;