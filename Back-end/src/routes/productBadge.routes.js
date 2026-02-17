const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/badge-type/:badgeType', async (req, res) => {
    try {
        const { badgeType } = req.params;
        const result = await pool.query(`
            SELECT p.*, b.brand_name
            FROM products p
            LEFT JOIN brands b ON p.brand_id = b.brand_id
            WHERE p.is_active = true
            ORDER BY p.created_at DESC
            LIMIT 20
        `);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching products by badge:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
