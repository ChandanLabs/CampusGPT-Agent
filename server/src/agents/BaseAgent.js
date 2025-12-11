const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

class BaseAgent {
    constructor(apiKey, modelName = 'gemini-pro') {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: modelName });
    }

    async generate(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Agent Generation Error:', error);
            throw error;
        }
    }

    // Base method for file to text if needed broadly
    async fileToGenerativePart(path, mimeType) {
        return {
            inlineData: {
                data: Buffer.from(fs.readFileSync(path)).toString('base64'),
                mimeType
            },
        };
    }
}

module.exports = BaseAgent;
