const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bankDetailsSchema = require('./bankDetailSchema')

const VendorSchema = new Schema({
    vendorType: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    vendorName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true
    },
    partnerName: {
        type: String,
        required: true,
    }, 
    groupEntities: {
        type: String,
        required: true,
    },   
    bankDetails: bankDetailsSchema,
    isVisible: {
        type: Boolean,
        default: true 
    }
})

const VendorModel = mongoose.model('vendor', VendorSchema);

module.exports = VendorModel;