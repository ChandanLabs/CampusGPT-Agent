const BaseAgent = require('./BaseAgent');

class TeacherAgent extends BaseAgent {
    constructor(apiKey) {
        super(apiKey, 'gemini-pro');
    }

    async generateQuiz(topic, level = 'bloom_apply') {
        const prompt = `
      You are a teacher. Create a quiz for topic: "${topic}" at Bloom's Taxonomy level: "${level}".
      Generate 5 Multiple Choice Questions.

      JSON Output Format:
      {
        "title": "Quiz Title",
        "questions": [
           {
             "id": 1,
             "question": "Question text...",
             "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
             "answer": "A. ...",
             "explanation": "Why this is correct..."
           }
        ]
      }
      Ensure the output is pure JSON.
    `;
        const result = await this.model.generateContent(prompt);
        return this._parseJSON(await result.response.text());
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

module.exports = TeacherAgent;
