const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "organization"], required: true },
  organizationName: String,
  organizationType: String,
  logo: String,
  primaryColor: String
});

module.exports = mongoose.model("User", userSchema);
