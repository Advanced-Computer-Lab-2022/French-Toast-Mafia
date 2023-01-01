const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reqRefundSchema = new Schema({
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
    status: {
        type: String, 
        enum: ["Unseen","Accepted","Rejected"],
        default: "Unseen"

    }

}, { timestamps: true });

const reqRefund = mongoose.model('reqRefund', reqRefundSchema);
module.exports = reqRefund;
