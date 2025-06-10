const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
};

// POST /api/forms - Create a new form
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, description, category, fields, status } = req.body;

    // Validate required fields
    if (!name || !category || !fields || fields.length === 0) {
      return res.status(400).json({ 
        message: 'Name, category, and at least one field are required' 
      });
    }

    // Create new form
    const newForm = new Form({
      name,
      description,
      category,
      fields,
      status: status || 'draft',
      organizationId: req.session.userId // Assuming userId is stored in session
    });

    const savedForm = await newForm.save();
    
    res.status(201).json({
      message: 'Form created successfully',
      form: savedForm
    });

  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ 
      message: 'Failed to create form',
      error: error.message 
    });
  }
});

// GET /api/forms - Get all forms for the authenticated organization
router.get('/', requireAuth, async (req, res) => {
  try {
    const forms = await Form.find({ organizationId: req.session.userId })
      .sort({ createdAt: -1 });
    
    res.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ 
      message: 'Failed to fetch forms',
      error: error.message 
    });
  }
});

// GET /api/forms/:id - Get a specific form
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const form = await Form.findOne({ 
      _id: req.params.id, 
      organizationId: req.session.userId 
    });
    
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    res.json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ 
      message: 'Failed to fetch form',
      error: error.message 
    });
  }
});

// PUT /api/forms/:id - Update a form
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { name, description, category, fields, status } = req.body;
    
    const updatedForm = await Form.findOneAndUpdate(
      { _id: req.params.id, organizationId: req.session.userId },
      { name, description, category, fields, status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    res.json({
      message: 'Form updated successfully',
      form: updatedForm
    });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ 
      message: 'Failed to update form',
      error: error.message 
    });
  }
});

// DELETE /api/forms/:id - Delete a form
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deletedForm = await Form.findOneAndDelete({ 
      _id: req.params.id, 
      organizationId: req.session.userId 
    });
    
    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ 
      message: 'Failed to delete form',
      error: error.message 
    });
  }
});

module.exports = router;