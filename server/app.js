const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import route files
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studyPlanRoutes = require('./routes/studyPlanRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User management routes
app.use('/api/courses', courseRoutes); // Course-related routes
app.use('/api/study-plans', studyPlanRoutes); // Study plan routes

// Root endpoint
app.get('/', (req, res) => res.send('Learning Dashboard API'));

// Error handling for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Database connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
