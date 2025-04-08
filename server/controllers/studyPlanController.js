const StudyPlan = require('../models/StudyPlan');

// Create a new study plan
exports.createStudyPlan = async (req, res) => {
    try {
        const { courseId="63e29b7f4a6c43e9b8d7a2e8", schedule =[
            { "date": "2024-12-01", "content": "Introduction to React" },
            { "date": "2024-12-02", "content": "React Components and Props" }
        ]} = req.body;
        const studyPlan = new StudyPlan({ courseId, schedule });
        await studyPlan.save();
        res.status(201).json({ message: 'Study Plan created successfully', studyPlan });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all study plans for a course
exports.getStudyPlans = async (req, res) => {
    try {
        const studyPlans = await StudyPlan.find({ courseId: req.params.courseId }).populate('courseId', 'title');
        res.status(200).json(studyPlans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
