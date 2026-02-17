const pool = require('../config/database');

// Get applicable taxes
exports.getTaxes = async (req, res) => {
  try {
    const { state, country } = req.query;

    let query = 'SELECT * FROM taxes WHERE is_active = true';
    const params = [];

    if (state) {
      params.push(state);
      query += ` AND state = $${params.length}`;
    }
    if (country) {
      params.push(country);
      query += ` AND country = $${params.length}`;
    }

    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get taxes error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get shipping/handling fees
exports.getFees = async (req, res) => {
  try {
    const { order_amount, state } = req.query;

    const result = await pool.query(
      'SELECT * FROM fees WHERE is_active = true ORDER BY min_order_amount DESC'
    );

    let applicableFee = result.rows.find(fee => 
      parseFloat(order_amount) >= fee.min_order_amount
    ) || result.rows[result.rows.length - 1];

    res.json({ success: true, data: applicableFee });
  } catch (error) {
    console.error('Get fees error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
