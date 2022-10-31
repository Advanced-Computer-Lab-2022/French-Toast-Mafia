const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true

    },
    Age: {
      type: Number,
      required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    Birthday: {
        type: Date,
        required: true,
    },
    Country: {
      type: String,
      required: true
    },
    Password: {
      type: String,
      required: true,
      minlength: 8
    },
    PhoneNumber: {
      type: Number,
      required: true
    },
    Type : {                //individual or coorperate trainee
        type: String,
        required: true
    },
    Job: {
      type: String,
      required: true
    },
    FieldOrMajor: {
        type: String,
        required: true
    },
    University: {
        type: String,
        required: false
    },
    LearningGoal : {
        type: String,
        required: false
    },
    PreferredLevel : {
        type: String,
        required: false
    }
  }, { timestamps: true });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;