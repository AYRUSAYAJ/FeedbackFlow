const express = require("express");
const mongoose = require("mongoose");
const Form = require("../models/Form");
const Feedback = require("../models/Feedback");
const User = require("../models/User");

const router = express.Router();

// Middleware to validate organization ID
const validateOrgId = async (req, res, next) => {
  const orgId = req.params.orgId || req.query.orgId;
  
  if (!orgId || !mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(400).json({ message: "Invalid organization ID" });
  }

  const user = await User.findById(orgId);
  if (!user) {
    return res.status(404).json({ message: "Organization not found" });
  }

  req.organization = user;
  next();
};

// Get organization info
router.get("/org-info", validateOrgId, async (req, res) => {
  try {
    const { organization } = req;
    res.json({
      name: organization.organizationName,
      type: organization.organizationType,
      logo: organization.logo,
      primaryColor: organization.primaryColor,
    });
  } catch (error) {
    console.error("Error fetching org info:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get dashboard stats
router.get("/stats", validateOrgId, async (req, res) => {
  try {
    const orgId = req.query.orgId;
    const forms = await Form.find({ organizationId: orgId });
    const feedbacks = await Feedback.find({ organizationId: orgId });
    
    const totalResponses = feedbacks.length;
    const avgRating = totalResponses > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalResponses).toFixed(1)
      : 0;

    res.json({
      totalForms: forms.length,
      totalResponses,
      avgRating,
      responseRate: "72%",
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get feedback forms
router.get("/forms", validateOrgId, async (req, res) => {
  try {
    const orgId = req.query.orgId;
    const forms = await Form.find({ organizationId: orgId });
    res.json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get recent feedback
router.get("/recent-feedback", validateOrgId, async (req, res) => {
  try {
    const orgId = req.query.orgId;
    const forms = await Form.find({ organizationId: orgId });
    const feedbacks = await Feedback.find({ organizationId: orgId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(feedbacks.map((fb) => ({
      form: forms.find((f) => f._id.toString() === fb.formId.toString())?.name || "Unknown",
      rating: fb.rating,
      comment: fb.comment,
      time: fb.createdAt,
    })));
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
