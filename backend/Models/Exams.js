const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;


const examSchema = new Schema ({
      courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: true
      },
      instrId:{
        type: mongoose.Types.ObjectId,
        ref: 'Instructor',
        required: true
      },
      users:{
        type:Array,
        required: false
      },
      title: {
        type: String,
        required: true
      }, 
      description: {
        type: String,
        required: false,
      },
      mcq:  [{
        question: {
          type: String,
          required: true
        },
        choice1: {
          type: String,
          required: true
        },
        choice2: {
          type: String,
          required: true
        },
        choice3: {
          type: String,
          required: true
        },
        choice4: {
          type: String,
          required: true
        },
        correct: {
          type: String,
          required: true
        },
    }
  ]
     
}, { timestamps: true });

const Exams = mongoose.model('Exams', examSchema);
module.exports = Exams;