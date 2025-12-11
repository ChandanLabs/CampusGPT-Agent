const BaseAgent = require('./BaseAgent');

class PlanAgent extends BaseAgent {
    constructor(apiKey) {
        super(apiKey, 'gemini-pro');
    }

    async createStudyPlan(examDate, availableHours, topics) {
        const prompt = `
      You are an expert academic planner. Create a study plan.
      Exam Date: ${examDate}
      Available Hours Per Day: ${availableHours}
      Topics to cover: ${JSON.stringify(topics)}

      Generate a daily plan in this JSON format:
      {
        "plan_overview": "Summary of the strategy...",
        "daily_schedule": [
          {
            "day": 1,
            "date": "YYYY-MM-DD",
            "focus_topics": ["Topic A", "Topic B"],
            "tasks": [
               {"time": "09:00 - 10:00", "activity": "Study Topic A"},
               {"time": "10:15 - 11:15", "activity": "Practice Questions for Topic A"}
            ]
          }
        ]
      }
      Ensure the output is pure JSON. Do not use markdown code fences.
    `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanText);
        } catch (e) {
            console.error("Plan Gen Error", e);
            return { error: "Failed to generate plan" };
        }
    }
}

module.exports = PlanAgent;
