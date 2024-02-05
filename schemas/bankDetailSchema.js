const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankDetailSchema = new Schema({
    holderName: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    accountName: {
        type: String,
        required: true
    },
    ifscCode: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    panNumber: {
        type: String,
        required: true,
        unique: true
    },
    gstNumber: {
        type: String,
        required: true,
        unique: true
    },
    msme: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    blockFlag: {
        type: String,
        required: true
    },
})



module.exports = BankDetailSchema;