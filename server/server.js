const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboard'); // Ensure this file exists and exports a router

require('dotenv').config();

const app = express();

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Connect to MongoDB
connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); // Exit the process if the database connection fails
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes); // Ensure dashboardRoutes is correctly implemented

const formRoutes = require('./routes/forms');
app.use('/api/forms', formRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
