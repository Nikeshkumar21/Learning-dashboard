const express = require('express');
const verifyRole = require('../middleware/authMiddleware');
const router = express.Router();

// Admin-only route
router.get('/admin/dashboard', verifyRole(['Admin']), (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});

// Educator-only route
router.get('/educator/assignments', verifyRole(['Educator']), (req, res) => {
    res.json({ message: 'Educator Assignment Management' });
});

// Student-only route
router.post('/student/submit-assignment', verifyRole(['Student']), (req, res) => {
    res.json({ message: 'Assignment Submitted' });
});

module.exports = router;
