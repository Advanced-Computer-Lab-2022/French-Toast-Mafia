const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    requested_by: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    requested_course: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: true
    },
   follow_up: {
        type: Array,
        required: false

    },
    status: {
        type: String, "enum": ["Unseen","Accepted","Rejected"],
        default: "Unseen"

    }

}, { timestamps: true });

const Request = mongoose.model('Request', RequestSchema);
module.exports = Request;