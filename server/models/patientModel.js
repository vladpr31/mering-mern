const mongoose = require("mongoose");

const patientModel = new mongoose.Schema({
  firstName: String,
  lastName: String,
  apotropos: { type: mongoose.Schema.Types.ObjectId, ref: "Apotropos" } || null,
  location: String,
  phoneNumber: Number,
  illnesses: [],
  dateOfBirth: Date,
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointments" }],
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
  profileImage: Object,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  gender: String,
});

const Patient = mongoose.model("Patients", patientModel);
module.exports = Patient;
