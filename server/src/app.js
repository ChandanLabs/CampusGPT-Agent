const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/notesRoutes')); // Use notesRoutes for processing uploads
app.use('/api/notes', require('./routes/notesRoutes'));
app.use('/api/tutor', require('./routes/tutorRoutes'));

// Base route
app.get('/', (req, res) => {
    res.send('CampusGPT API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

module.exports = app;
