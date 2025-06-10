const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'textarea', 'rating', 'select', 'email', 'phone', 'number', 'date', 'image', 'location', 'toggle']
  },
  label: {
    type: String,
    required: true
  },
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  },
  maxRating: Number, // For rating fields
  options: [String] // For select fields
});

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    required: true,
    enum: ['general', 'medical', 'hospitality', 'education', 'food', 'facilities']
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fields: [fieldSchema],
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft'
  },
  responses: {
    type: Number,
    default: 0
  },
  avgRating: {
    type: Number,
    default: 0
  },
  qrScans: {
    type: Number,
    default: 0
  },
  lastResponse: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
formSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Form", formSchema);