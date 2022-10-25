const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    NameOfCourse: {
      type: String,
      required: true
    },
    CourseSubtitle: {
      type: String,
      required: true
    },
    CourseId: {
      type: String,
      required: true,
      unique: true
    },
    Instructor: {
      type: String,
      required: true
    },
    Duration: {
      type: String,
      required: true
    },
    LevelOfCourse: {
      type: String,
      required: true
    },
    Summary: {
      type: String,
      required: true
    },
    Subject: {
      type: String,
      required: true
    },
    Rating: {
      type: String,
      required: true
    },
    NoOfViews: {
      type: Number,
      required: true
    },
    Discount: {
      type: Number,
      required: false
    },
    Cost: {
        type: String,
        required: true
      }
  }, { timestamps: true });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;