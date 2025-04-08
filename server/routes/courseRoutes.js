const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Fetch all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find(); // Fetch all courses from the database
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Seed IT Courses
router.post('/seed', async (req, res) => {
    try {
        const courses = [
            { title: 'Web Development Basics', description: 'HTML, CSS, and JavaScript fundamentals' },
            { title: 'React for Beginners', description: 'Learn React.js and build dynamic web applications' },
            { title: 'Node.js Essentials', description: 'Back-end development with Node.js and Express.js' },
            { title: 'MongoDB Basics', description: 'Database management with MongoDB' },
            { title: 'DevOps Foundations', description: 'Introduction to CI/CD, Docker, and Kubernetes' },
        ];

        // Insert courses if they don't already exist
        for (const course of courses) {
            const existingCourse = await Course.findOne({ title: course.title });
            if (!existingCourse) {
                await Course.create(course);
            }
        }

        res.status(201).json({ message: 'IT courses seeded successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
