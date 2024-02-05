const express = require("express");
const router = express.Router();
const vendorRegistrationValidation = require("../utils/validation");
const Vendor = require("../schemas/vendorSchema");

router.post("/addAgency", (req, res) => {
  const { error, value } = vendorRegistrationValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    const body = req.body;
    const bankDetail = {
      holderName: body.holderName,
      bankName: body.bankName,
      accountName: body.accountName,
      ifscCode: body.ifscCode,
      branchName: body.branchName,
      location: body.location,
      panNumber: body.panNumber,
      gstNumber: body.gstNumber,
      msme: body.msme,
      status: body.status,
      blockFlag: body.blockFlag,
    };
    const vendor = {
      vendorType: body.type,
      email: body.email,
      vendorName: body.name,
      address: body.address,
      contactNumber: body.mobileNumber,
      partnerName: body.partnerName,
      groupEntities: body.groupEntities,
      bankDetails: bankDetail,
    };

    const vendorRegistration = new Vendor(vendor);
    vendorRegistration
      .save()
      .then((vendor) => {
        res.json({ msg: "Successfully Registred", vendor });
      })
      .catch((err) => {
        return res.status(400).json({ error: err.message });
      });
  }
});

router.get("/listAllAgency", (req, res) => {
  const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;
  const PAGE_SIZE = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  const skip = (pageNumber - 1) * PAGE_SIZE;
  const emailSort = req.query.emailSort == "asc" ? 1 : -1;
  const numberSort = req.query.emailSort == "asc" ? 1 : -1;
  const idSort = req.query.emailSort == "asc" ? 1 : -1;
  const sortCriteria = {
    email: emailSort,
    contactNumber: numberSort,
    _id: idSort,
  };
  Vendor.find({ isVisible: true })
    .skip(skip)
    .limit(PAGE_SIZE)
    .sort(sortCriteria)
    .then((vendors) => {
      res.json({ msg: "Data Listed", vendors });
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
});

router.get("/agencyDetails/:vendorId", (req, res) => {
  const vendorId = req.params.vendorId;
  Vendor.findById(vendorId)
    .then((vendor) => {
      if (vendor) {
        res.json({ msg: "Data Fetched", vendor });
      } else {
        res.status(404).json({ msg: "No Data Found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
});

router.put("/updateAgencyDetails", (req, res) => {
  const { error, value } = vendorRegistrationValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    const body = req.body;

    const bankDetail = {
      holderName: body.holderName,
      bankName: body.bankName,
      accountName: body.accountName,
      ifscCode: body.ifscCode,
      branchName: body.branchName,
      location: body.location,
      panNumber: body.panNumber,
      gstNumber: body.gstNumber,
      msme: body.msme,
      status: body.status,
      blockFlag: body.blockFlag,
    };
    const vendor = {
      vendorType: body.type,
      email: body.email,
      vendorName: body.name,
      address: body.address,
      contactNumber: body.mobileNumber,
      partnerName: body.partnerName,
      groupEntities: body.groupEntities,
      bankDetails: bankDetail,
    };

    Vendor.findOneAndUpdate({ _id: body.id }, { $set: vendor }, { new: true })
      .then((updatedDocument) => {
        if (updatedDocument) {
          res.json({ msg: "Data Updated", updatedDocument });
        } else {
          res.status(404).json({ msg: "No Data Found" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ error: err.message });
      });
  }
});

router.put("/deleteAgencyDetails/:vendorId", (req, res) => {
  const vendorId = req.params.vendorId;
  Vendor.findOneAndUpdate(
    { _id: vendorId },
    { $set: { isVisible: false } },
    { new: true }
  )
    .then((updatedDocument) => {
      if (updatedDocument) {
        res.json({ msg: "Data Deleted", updatedDocument });
      } else {
        res.status(404).json({ msg: "No Data Found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
});

module.exports = router;
