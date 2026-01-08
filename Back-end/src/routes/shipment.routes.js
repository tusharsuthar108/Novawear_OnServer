const express = require('express');
const router = express.Router();

// Get all shipments with optional status filter
router.get('/', async (req, res) => {
  try {
    const pool = require('../config/database');
    const { status } = req.query;
    
    let query = `
      SELECT s.*, sp.provider_name, sp.provider_code
      FROM shipments s
      LEFT JOIN shipping_providers sp ON s.provider_id = sp.provider_id
      ORDER BY s.created_at DESC
    `;
    
    if (status) {
      query = `
        SELECT s.*, sp.provider_name, sp.provider_code
        FROM shipments s
        LEFT JOIN shipping_providers sp ON s.provider_id = sp.provider_id
        WHERE s.shipment_status = $1
        ORDER BY s.created_at DESC
      `;
    }
    
    const result = status 
      ? await pool.query(query, [status])
      : await pool.query(query);
      
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get shipment by ID with tracking events
router.get('/:id', async (req, res) => {
  try {
    const pool = require('../config/database');
    const { id } = req.params;
    
    const shipmentResult = await pool.query(`
      SELECT s.*, sp.provider_name, sp.provider_code
      FROM shipments s
      LEFT JOIN shipping_providers sp ON s.provider_id = sp.provider_id
      WHERE s.shipment_id = $1
    `, [id]);
    
    if (shipmentResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Shipment not found' });
    }
    
    const trackingResult = await pool.query(`
      SELECT * FROM shipment_tracking 
      WHERE shipment_id = $1 
      ORDER BY event_timestamp DESC
    `, [id]);
    
    const shipment = shipmentResult.rows[0];
    shipment.tracking_events = trackingResult.rows;
    
    res.json({ success: true, data: shipment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new shipment
router.post('/', async (req, res) => {
  try {
    const pool = require('../config/database');
    const {
      order_id, provider_id, tracking_number, pickup_address,
      delivery_address, estimated_delivery, weight, dimensions,
      package_count, shipping_cost, insurance_cost, notes
    } = req.body;
    
    const result = await pool.query(`
      INSERT INTO shipments (
        order_id, provider_id, tracking_number, pickup_address,
        delivery_address, estimated_delivery, weight, dimensions,
        package_count, shipping_cost, insurance_cost, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      order_id, provider_id, tracking_number, pickup_address,
      delivery_address, estimated_delivery, weight, dimensions,
      package_count, shipping_cost, insurance_cost, notes
    ]);
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update shipment
router.put('/:id', async (req, res) => {
  try {
    const pool = require('../config/database');
    const { id } = req.params;
    const {
      order_id, provider_id, tracking_number, shipment_status,
      pickup_address, delivery_address, estimated_delivery,
      actual_delivery, weight, dimensions, package_count,
      shipping_cost, insurance_cost, notes
    } = req.body;
    
    const result = await pool.query(`
      UPDATE shipments SET
        order_id = $1, provider_id = $2, tracking_number = $3,
        shipment_status = $4, pickup_address = $5, delivery_address = $6,
        estimated_delivery = $7, actual_delivery = $8, weight = $9,
        dimensions = $10, package_count = $11, shipping_cost = $12,
        insurance_cost = $13, notes = $14, updated_at = CURRENT_TIMESTAMP
      WHERE shipment_id = $15
      RETURNING *
    `, [
      order_id, provider_id, tracking_number, shipment_status,
      pickup_address, delivery_address, estimated_delivery,
      actual_delivery, weight, dimensions, package_count,
      shipping_cost, insurance_cost, notes, id
    ]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Shipment not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update shipment status
router.patch('/:id/status', async (req, res) => {
  try {
    const pool = require('../config/database');
    const { id } = req.params;
    const { status, location, notes } = req.body;
    
    // Update shipment status
    const shipmentResult = await pool.query(`
      UPDATE shipments SET 
        shipment_status = $1,
        updated_at = CURRENT_TIMESTAMP,
        ${status === 'delivered' ? 'actual_delivery = CURRENT_TIMESTAMP,' : ''}
        ${status === 'in_transit' ? 'shipped_date = COALESCE(shipped_date, CURRENT_TIMESTAMP),' : ''}
      WHERE shipment_id = $2
      RETURNING *
    `.replace(/,\s*WHERE/, ' WHERE'), [status, id]);
    
    if (shipmentResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Shipment not found' });
    }
    
    // Add tracking event
    await pool.query(`
      INSERT INTO shipment_tracking (shipment_id, event_type, event_description, event_location, event_timestamp)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
    `, [id, `status_${status}`, notes || `Status updated to ${status}`, location || 'Unknown']);
    
    res.json({ success: true, data: shipmentResult.rows[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Add tracking event
router.post('/:id/tracking', async (req, res) => {
  try {
    const pool = require('../config/database');
    const { id } = req.params;
    const { event_type, event_description, event_location, event_timestamp } = req.body;
    
    const result = await pool.query(`
      INSERT INTO shipment_tracking (shipment_id, event_type, event_description, event_location, event_timestamp)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [id, event_type, event_description, event_location, event_timestamp || new Date()]);
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete shipment
router.delete('/:id', async (req, res) => {
  try {
    const pool = require('../config/database');
    const { id } = req.params;
    
    await pool.query('DELETE FROM shipments WHERE shipment_id = $1', [id]);
    res.json({ success: true, message: 'Shipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get shipping providers
router.get('/providers/list', async (req, res) => {
  try {
    const pool = require('../config/database');
    const result = await pool.query(`
      SELECT * FROM shipping_providers 
      WHERE is_active = true 
      ORDER BY provider_name
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;