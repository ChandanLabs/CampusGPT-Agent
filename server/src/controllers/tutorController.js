const PlanAgent = require('../agents/PlanAgent');
const TutorAgent = require('../agents/TutorAgent');
const TeacherAgent = require('../agents/TeacherAgent');

const planAgent = new PlanAgent(process.env.GEMINI_API_KEY);
const tutorAgent = new TutorAgent(process.env.GEMINI_API_KEY);
const teacherAgent = new TeacherAgent(process.env.GEMINI_API_KEY);

exports.createPlan = async (req, res) => {
    const { examDate, availableHours, topics } = req.body;
    try {
        const plan = await planAgent.createStudyPlan(examDate, availableHours, topics);
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.explainTopic = async (req, res) => {
    const { topic, context } = req.body;
    try {
        const explanation = await tutorAgent.explainTopic(topic, context);
        res.json(explanation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.generateQuiz = async (req, res) => {
    const { topic, level } = req.body;
    try {
        const quiz = await teacherAgent.generateQuiz(topic, level);
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
