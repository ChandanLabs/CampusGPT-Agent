const BaseAgent = require('./BaseAgent');

class TutorAgent extends BaseAgent {
    constructor(apiKey) {
        super(apiKey, 'gemini-pro');
    }

    async explainTopic(topic, context = "") {
        const prompt = `
      You are a friendly and expert tutor. Explain the topic: "${topic}".
      Context provided: "${context}"

      Provide the output in JSON:
      {
        "explanation": "Clear, simple explanation...",
        "examples": ["Example 1", "Example 2"],
        "analogy": "A relatable analogy to explain the concept...",
        "quiz_question": {
            "question": "A simple check-for-understanding question",
            "options": ["A", "B", "C", "D"],
            "correct_answer": "A"
        }
      }
       Ensure the output is pure JSON.
    `;
        const result = await this.model.generateContent(prompt);
        return this._parseJSON(await result.response.text()); // Helper method usage pattern if I added it, but let's stick to inline for now or add helper
    }

    async _parseJSON(text) {
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        try {
            return JSON.parse(cleanText);
        } catch (e) {
            return { error: "Failed to parse JSON", raw: text };
        }
    }
}

module.exports = TutorAgent;
