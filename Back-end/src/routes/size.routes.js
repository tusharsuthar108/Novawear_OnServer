const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET /api/sizes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sizes ORDER BY size_name ASC');
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching sizes:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
