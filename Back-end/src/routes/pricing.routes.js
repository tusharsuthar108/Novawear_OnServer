const express = require('express');
const router = express.Router();

// Pricing Plans Routes
router.get('/plans', async (req, res) => {
  try {
    const pool = require('../config/database');
    const result = await pool.query(`
      SELECT * FROM pricing_plans 
      ORDER BY created_at DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/plans', async (req, res) => {
  try {
    const pool = require('../config/database');
    const { plan_name, description, discount_type, discount_value, is_active } = req.body;
    
    const result = await pool.query(
      'INSERT INTO pricing_plans (plan_name, description, discount_type, discount_value, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [plan_name, description, discount_type, discount_value, is_active ?? true]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/plans/:id', async (req, res) => {
  try {
    const pool = require('../config/database');
    await pool.query('DELETE FROM pricing_plans WHERE plan_id = $1', [req.params.id]);
    res.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Coupons Routes
router.get('/coupons', async (req, res) => {
  try {
    const pool = require('../config/database');
    const result = await pool.query(`
      SELECT * FROM coupons 
      ORDER BY created_at DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/coupons', async (req, res) => {
  try {
    console.log('Raw request body:', JSON.stringify(req.body, null, 2));
    const pool = require('../config/database');
    const { 
      coupon_code, description, discount_type, discount_value, 
      min_order_amount, max_discount_amount, start_date, end_date, 
      usage_limit, is_active 
    } = req.body;
    
    console.log('Individual fields:');
    console.log('min_order_amount:', min_order_amount, 'type:', typeof min_order_amount);
    console.log('max_discount_amount:', max_discount_amount, 'type:', typeof max_discount_amount);
    console.log('usage_limit:', usage_limit, 'type:', typeof usage_limit);
    
    // Clean data conversion
    const cleanData = {
      coupon_code: coupon_code?.trim(),
      description: description?.trim() || null,
      discount_type,
      discount_value: discount_value ? parseFloat(discount_value) : null,
      min_order_amount: (min_order_amount && min_order_amount.toString().trim() !== '') ? parseFloat(min_order_amount) : null,
      max_discount_amount: (max_discount_amount && max_discount_amount.toString().trim() !== '') ? parseFloat(max_discount_amount) : null,
      start_date: (start_date && start_date.trim() !== '') ? start_date : null,
      end_date: (end_date && end_date.trim() !== '') ? end_date : null,
      usage_limit: (usage_limit && usage_limit.toString().trim() !== '') ? parseInt(usage_limit) : null,
      is_active: is_active ?? true
    };
    
    console.log('Clean data:', JSON.stringify(cleanData, null, 2));
    
    const result = await pool.query(
      `INSERT INTO coupons (coupon_code, description, discount_type, discount_value, 
       min_order_amount, max_discount_amount, start_date, end_date, usage_limit, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [cleanData.coupon_code, cleanData.description, cleanData.discount_type, cleanData.discount_value,
       cleanData.min_order_amount, cleanData.max_discount_amount, cleanData.start_date, 
       cleanData.end_date, cleanData.usage_limit, cleanData.is_active]
    );
    
    console.log('Coupon created successfully:', result.rows[0]);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Coupon creation error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/coupons/:id', async (req, res) => {
  try {
    const pool = require('../config/database');
    await pool.query('DELETE FROM coupons WHERE coupon_id = $1', [req.params.id]);
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Taxes Routes
router.get('/taxes', async (req, res) => {
  try {
    const pool = require('../config/database');
    const result = await pool.query(`
      SELECT * FROM taxes 
      ORDER BY created_at DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/taxes', async (req, res) => {
  try {
    const pool = require('../config/database');
    const { tax_name, tax_type, tax_value, is_active } = req.body;
    
    const result = await pool.query(
      'INSERT INTO taxes (tax_name, tax_type, tax_value, is_active) VALUES ($1, $2, $3, $4) RETURNING *',
      [tax_name, tax_type, tax_value, is_active ?? true]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/taxes/:id', async (req, res) => {
  try {
    const pool = require('../config/database');
    await pool.query('DELETE FROM taxes WHERE tax_id = $1', [req.params.id]);
    res.json({ success: true, message: 'Tax deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fees Routes
router.get('/fees', async (req, res) => {
  try {
    const pool = require('../config/database');
    const result = await pool.query(`
      SELECT * FROM fees 
      ORDER BY created_at DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/fees', async (req, res) => {
  try {
    const pool = require('../config/database');
    const { fee_name, fee_type, fee_value, is_active } = req.body;
    
    const result = await pool.query(
      'INSERT INTO fees (fee_name, fee_type, fee_value, is_active) VALUES ($1, $2, $3, $4) RETURNING *',
      [fee_name, fee_type, fee_value, is_active ?? true]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/fees/:id', async (req, res) => {
  try {
    const pool = require('../config/database');
    await pool.query('DELETE FROM fees WHERE fee_id = $1', [req.params.id]);
    res.json({ success: true, message: 'Fee deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;