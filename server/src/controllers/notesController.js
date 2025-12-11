const NotesAgent = require('../agents/NotesAgent');
const path = require('path');

const notesAgent = new NotesAgent(process.env.GEMINI_API_KEY);

exports.processUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const mimeType = req.file.mimetype;

        console.log(`Processing file: ${filePath}`);

        const notes = await notesAgent.processFile(filePath, mimeType);

        res.json({
            message: 'File processed successfully',
            data: notes,
            file: {
                filename: req.file.filename,
                path: req.file.path
            }
        });

    } catch (error) {
        console.error('Notes Processing Error:', error);
        res.status(500).json({ message: 'Failed to process notes', error: error.message });
    }
};
