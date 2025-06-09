const express = require('express');
// ❌ Removed bcrypt
const Organization = require('../models/Organization');

const router = express.Router();

// Org Admin login route
router.post('/login/orgadmin', async (req, res) => {
  const { email, password, orgCode } = req.body;

  try {
    // Trim and normalize inputs for consistency
    const org = await Organization.findOne({
      email: email.trim().toLowerCase(),
      orgCode: orgCode.trim().toUpperCase()
    });

    if (!org) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Plain-text password comparison
    if (org.password !== password.trim()) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Send basic success response
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

module.exports = router;
