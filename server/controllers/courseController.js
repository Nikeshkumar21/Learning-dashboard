const Course = require('../models/Course');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const { title= "React Basics", description="Learn the basics of React.js", coordinatorId ="63e29b7f4a6c43e9b8d7a2e8"} = req.body;
        const course = new Course({ title, description, coordinatorId });
        await course.save();
        res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('coordinatorId', 'name email');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single course
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('coordinatorId', 'name email');
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a course
exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
