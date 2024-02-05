const Joi = require("joi");

const vendorRegistrationSchema = Joi.object({
  id:Joi.string(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  mobileNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message("Mobile number must be a 10-digit numeric string")
    .required(),
  partnerName: Joi.string().required(),
  type: Joi.string().required(),
  groupEntities: Joi.string().required(),
  holderName: Joi.string().required(),
  bankName: Joi.string().required(),
  accountName: Joi.string().required(),
  branchName: Joi.string().required(),
  location: Joi.string().required(),
  msme: Joi.string().required(),
  status: Joi.string().required(),
  blockFlag: Joi.string().required(),
  ifscCode: Joi.string()
    .pattern(/^([A-Za-z]{4})([0]{1})([0-9]{6})$/)
    .message("IFSC code must be a 11-character alphanumeric string")
    .required(),
  panNumber: Joi.string()
    .pattern(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/)
    .message("PAN number must be in the format ABCDE1234F")
    .required(),
  gstNumber: Joi.string()
    .pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)
    .message("GST number must be in the format XXABCDE1234F1Z1"),
});

module.exports = vendorRegistrationSchema;
