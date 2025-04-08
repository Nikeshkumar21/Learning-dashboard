const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    schedule: [
        {
            date: { type: Date, required: true },
            content: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
