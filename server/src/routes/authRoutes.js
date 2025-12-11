const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    // Mock login for now
    res.json({ token: 'mock-jwt-token', user: { id: 1, name: 'Student' } });
});

router.post('/register', (req, res) => {
    res.json({ message: 'Registered successfully' });
});

module.exports = router;
