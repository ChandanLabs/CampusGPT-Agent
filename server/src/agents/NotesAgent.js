const BaseAgent = require('./BaseAgent');

class NotesAgent extends BaseAgent {
    constructor(apiKey) {
        super(apiKey, 'gemini-1.5-flash'); // Using flash for multimodal efficiency
    }

    async processFile(filePath, mimeType) {
        const filePart = await this.fileToGenerativePart(filePath, mimeType);

        const prompt = `
      You are an expert academic assistant. Analyze this document/image.
      Provide the output in the following JSON format:
      {
        "summary": "Concise summary of the content...",
        "key_points": ["Point 1", "Point 2", ...],
        "structured_notes": "Markdown formatted detailed notes...",
        "qa_pairs": [
           {"question": "...", "answer": "..."}
        ]
      }
      Ensure the output is pure JSON. Do not use markdown code fences.
    `;

        const result = await this.model.generateContent([prompt, filePart]);
        const response = await result.response;
        const text = response.text();

        // Clean up if the model adds markdown fences
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
    }
}

module.exports = NotesAgent;
