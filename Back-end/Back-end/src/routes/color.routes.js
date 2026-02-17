const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET /api/colors
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM colors ORDER BY color_name ASC');
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching colors:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
