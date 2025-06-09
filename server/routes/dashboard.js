const express = require("express");
const mongoose = require("mongoose");
const Form = require("../models/Form");
const Feedback = require("../models/Feedback");
const User = require("../models/User");

const router = express.Router();

router.get("/:orgId", async (req, res) => {
  try {
    const { orgId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orgId)) {
      return res.status(400).json({ message: "Invalid organization ID" });
    }

    const user = await User.findById(orgId);
    if (!user) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const forms = await Form.find({ organizationId: orgId });

    const feedbacks = await Feedback.find({ organizationId: orgId })
      .sort({ createdAt: -1 })
      .limit(5);

    const totalResponses = feedbacks.length;

    const avgRating =
      totalResponses > 0
        ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalResponses).toFixed(1)
        : 0;

    // Placeholder, replace with actual calculation if available
    const responseRate = "72%";

    res.json({
      orgInfo: {
        name: user.organizationName,
        type: user.organizationType,
        logo: user.logo,
        primaryColor: user.primaryColor,
      },
      stats: {
        totalForms: forms.length,
        totalResponses,
        avgRating,
        responseRate,
      },
      forms,
      recentFeedback: feedbacks.map((fb) => ({
        form: forms.find((f) => f._id.toString() === fb.formId.toString())?.name || "Unknown",
        rating: fb.rating,
        comment: fb.comment,
        time: fb.createdAt,
      })),
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
