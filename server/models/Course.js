const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    coordinatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional
});

module.exports = mongoose.model('Course', courseSchema);
