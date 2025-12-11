const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const notesController = require('../controllers/notesController');

router.post('/process', upload.single('file'), notesController.processUpload);

module.exports = router;
