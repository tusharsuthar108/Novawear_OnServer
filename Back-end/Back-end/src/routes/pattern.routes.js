const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET /api/patterns
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patterns ORDER BY pattern_name ASC');
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching patterns:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
