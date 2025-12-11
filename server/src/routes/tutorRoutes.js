const express = require('express');
const router = express.Router();
const BaseAgent = require('../agents/BaseAgent'); // Placeholder for simple interactions
// We will move Logic onto controllers
const tutorController = require('../controllers/tutorController');

router.post('/plan', tutorController.createPlan);
router.post('/explain', tutorController.explainTopic);
router.post('/quiz', tutorController.generateQuiz);

module.exports = router;
