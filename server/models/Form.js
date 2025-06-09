const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
