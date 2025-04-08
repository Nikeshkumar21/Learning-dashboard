const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const roleMiddleware = require('../middleware/roleMiddleware');


// Register User
router.post('/register', async (req, res) => {
    try {
        const { name = 'Magizh', email = 'magi@example.com', password = '12', role = 'Student' } = req.body;
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email= 'magi@example.com', password= '12' } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return token, role, and name
        res.status(200).json({
            token,
            role: user.role,
            name: user.name,
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Example protected routes
router.get('/study-plans', roleMiddleware(['Admin', 'Educator', 'Student']), (req, res) => {
    res.json({ message: 'Fetched study plans' });
});

router.post('/study-plans', roleMiddleware(['Admin', 'Educator']), (req, res) => {
    res.json({ message: 'Study plan created' });
});

router.put('/study-plans/:id', roleMiddleware(['Admin', 'Educator']), (req, res) => {
    res.json({ message: 'Study plan updated' });
});

router.delete('/study-plans/:id', roleMiddleware(['Admin', 'Educator']), (req, res) => {
    res.json({ message: 'Study plan deleted' });
});

module.exports = router; // Export the router properly
