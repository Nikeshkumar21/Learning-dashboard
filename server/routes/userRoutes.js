const express = require('express'); 
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Replace with your actual User model
const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store decoded user info in req.user
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// Middleware to verify Admin Role
const verifyAdmin = (req, res, next) => {
    if (!req.user?.role || req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

// Get all users (Admin only)
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Failed to fetch users. Please try again later.' });
    }
});

// Get current user info
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching current user:', error.message);
        res.status(500).json({ message: 'Failed to fetch user information.' });
    }
});

// Update user role (Admin only)
router.put('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
    const { role } = req.body;
    if (!['Admin', 'Educator', 'Student'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Must be Admin, Educator, or Student.' });
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User role updated successfully', user });
    } catch (error) {
        console.error('Error updating user role:', error.message);
        res.status(500).json({ message: 'Failed to update user role. Please try again later.' });
    }
});

// Delete a user (Admin only)
router.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Failed to delete user. Please try again later.' });
    }
});

module.exports = router;
