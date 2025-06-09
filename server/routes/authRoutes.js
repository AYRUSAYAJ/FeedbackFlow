const express = require('express');
const Organization = require('../models/Organization');

const router = express.Router();

// Org Admin login route
router.post('/login/orgadmin', async (req, res) => {
  const { email, password, orgCode } = req.body;

  try {
    const org = await Organization.findOne({
      email: email.trim().toLowerCase(),
      orgCode: orgCode.trim().toUpperCase()
    });

    if (!org) {
      console.log("No org found with given email + orgCode");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (org.password !== password.trim()) {
      console.log("Password does not match. Expected:", org.password, "Got:", password.trim());
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log("Login successful for:", org.email);
    res.json({
      message: 'Login successful',
      orgId: org._id,
      email: org.email,
      orgCode: org.orgCode
    });

  } catch (error) {
    console.error('Org admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router
module.exports = router;
