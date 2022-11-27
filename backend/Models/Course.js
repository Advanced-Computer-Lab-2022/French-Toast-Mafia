const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const courseSchema = new Schema({
    NameOfCourse: {
      type: String,
      required: true
    },
    CourseSubtitle: {
      type: Array,
      required: true
    },
    Instructor: {
      type: mongoose.Types.ObjectId,
      ref: 'Instructor',
      required: true
    },
    Duration: {
      type: String,
      required: false
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
      required: false
    },
    NoOfViews: {
      type: Number,
      required: false
    },
    Discount: {
      type: Number,
      required: false
    },
    Cost: {
        type: Number,
        required: true
      },
    CourseCurrency: {
        type: Number,
        required: false
    },
    Exams: {
      type: Array,
      required: false
    },
    DurationDiscount: {
      type: Number,
      required: false
    },  
    Preview: {
      type: String,
      required: false
    },
    
  }, { timestamps: true });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;