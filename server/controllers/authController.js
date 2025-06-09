// Removed bcrypt since we are doing plain-text password comparison
const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/SuperAdmin');
const Organization = require('../models/Organization');

// Super Admin Login
exports.loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await SuperAdmin.findOne({ email: email.trim().toLowerCase() });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Super Admin authenticated', email: user.email });
  } catch (err) {
    console.error('Super Admin login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Org Admin Login
exports.loginOrgAdmin = async (req, res) => {
  const { email, password, orgCode } = req.body;

  try {
    const user = await Organization.findOne({
      email: email.trim().toLowerCase(),
      orgCode: orgCode.trim().toUpperCase()
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials or code' });
    }

    res.json({
      message: 'Org Admin authenticated',
      email: user.email,
      orgCode: user.orgCode
    });
  } catch (err) {
    console.error('Org Admin login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
