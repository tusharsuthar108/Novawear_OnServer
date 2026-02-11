const pool = require('../config/database');

// Create address
exports.createAddress = async (req, res) => {
  try {
    const { user_id, address_line1, address_line2, city, state, pincode, country, is_default } = req.body;

    if (is_default) {
      await pool.query(
        'UPDATE user_addresses SET is_default = false WHERE user_id = $1',
        [user_id]
      );
    }

    const result = await pool.query(
      `INSERT INTO user_addresses (user_id, address_line1, address_line2, city, state, pincode, country, is_default) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [user_id, address_line1, address_line2, city, state, pincode, country, is_default || false]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Create address error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user addresses
exports.getUserAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      'SELECT * FROM user_addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC',
      [userId]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { address_line1, address_line2, city, state, pincode, country, is_default } = req.body;

    if (is_default) {
      const addressResult = await pool.query('SELECT user_id FROM user_addresses WHERE address_id = $1', [addressId]);
      if (addressResult.rows.length > 0) {
        await pool.query(
          'UPDATE user_addresses SET is_default = false WHERE user_id = $1',
          [addressResult.rows[0].user_id]
        );
      }
    }

    const result = await pool.query(
      `UPDATE user_addresses 
       SET address_line1 = $1, address_line2 = $2, city = $3, state = $4, pincode = $5, country = $6, is_default = $7 
       WHERE address_id = $8 RETURNING *`,
      [address_line1, address_line2, city, state, pincode, country, is_default, addressId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Address not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const result = await pool.query(
      'DELETE FROM user_addresses WHERE address_id = $1 RETURNING *',
      [addressId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Address not found' });
    }

    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
