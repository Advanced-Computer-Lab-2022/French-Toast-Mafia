const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reported_by: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    reported_course: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: true

    },
    
    description: {
        type: String,
        required: true
    },

    follow_up: {
        type: Array,
        required: false

    },
    type: {
        "type": String, "enum": ["technical", "financial","other"],
        required: true
    },

    status: {
        type: String,
        default: "Unseen"

    }

}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;