const express = require('express');
const { createStudyPlan, getStudyPlans } = require('../controllers/studyPlanController');
const router = express.Router();

router.post('/', createStudyPlan);
router.get('/:courseId', getStudyPlans);

module.exports = router;
