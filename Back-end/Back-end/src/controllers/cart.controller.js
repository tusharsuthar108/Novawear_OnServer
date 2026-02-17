const pool = require('../config/database');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { user_id, variant_id, quantity } = req.body;

    // Get or create cart for user
    let cartResult = await pool.query(
      'SELECT cart_id FROM cart WHERE user_id = $1',
      [user_id]
    );

    let cart_id;
    if (cartResult.rows.length === 0) {
      const newCart = await pool.query(
        'INSERT INTO cart (user_id) VALUES ($1) RETURNING cart_id',
        [user_id]
      );
      cart_id = newCart.rows[0].cart_id;
    } else {
      cart_id = cartResult.rows[0].cart_id;
    }

    // Check if item already exists in cart
    const existingItem = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = $1 AND variant_id = $2',
      [cart_id, variant_id]
    );

    if (existingItem.rows.length > 0) {
      // Update quantity
      const result = await pool.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND variant_id = $3 RETURNING *',
        [quantity, cart_id, variant_id]
      );
      return res.json({ success: true, data: result.rows[0] });
    } else {
      // Add new item
      const result = await pool.query(
        'INSERT INTO cart_items (cart_id, variant_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [cart_id, variant_id, quantity]
      );
      return res.json({ success: true, data: result.rows[0] });
    }
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(`
      SELECT 
        ci.cart_item_id,
        ci.quantity,
        pv.variant_id,
        pv.variant_sku,
        pv.price,
        pv.discount_price,
        p.product_id,
        p.name as product_name,
        p.image_url,
        b.brand_name,
        s.size_name,
        c.color_name,
        f.fabric_name,
        pat.pattern_name,
        i.stock_quantity
      FROM cart_items ci
      JOIN cart ca ON ci.cart_id = ca.cart_id
      JOIN product_variants pv ON ci.variant_id = pv.variant_id
      JOIN products p ON pv.product_id = p.product_id
      LEFT JOIN brands b ON p.brand_id = b.brand_id
      LEFT JOIN sizes s ON pv.size_id = s.size_id
      LEFT JOIN colors c ON pv.color_id = c.color_id
      LEFT JOIN fabrics f ON pv.fabric_id = f.fabric_id
      LEFT JOIN patterns pat ON pv.pattern_id = pat.pattern_id
      LEFT JOIN inventory i ON pv.variant_id = i.variant_id
      WHERE ca.user_id = $1
    `, [userId]);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { cart_item_id, quantity } = req.body;

    if (quantity <= 0) {
      await pool.query('DELETE FROM cart_items WHERE cart_item_id = $1', [cart_item_id]);
      return res.json({ success: true, message: 'Item removed from cart' });
    }

    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2 RETURNING *',
      [quantity, cart_item_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const result = await pool.query(
      'DELETE FROM cart_items WHERE cart_item_id = $1 RETURNING *',
      [itemId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }

    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartResult = await pool.query(
      'SELECT cart_id FROM cart WHERE user_id = $1',
      [userId]
    );

    if (cartResult.rows.length === 0) {
      return res.json({ success: true, message: 'Cart already empty' });
    }

    await pool.query(
      'DELETE FROM cart_items WHERE cart_id = $1',
      [cartResult.rows[0].cart_id]
    );

    res.json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
