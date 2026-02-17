const pool = require('../config/database');

class Badge {
  // Get all badges
  static async getAll() {
    const result = await pool.query('SELECT * FROM product_badges ORDER BY badge_name');
    return result.rows;
  }

  // Get badge by ID
  static async getById(badgeId) {
    const result = await pool.query('SELECT * FROM product_badges WHERE badge_id = $1', [badgeId]);
    return result.rows[0];
  }

  // Create new badge
  static async create(badgeData) {
    const { badge_name, description, is_active } = badgeData;
    const result = await pool.query(
      'INSERT INTO product_badges (badge_name, description, is_active) VALUES ($1, $2, $3) RETURNING *',
      [badge_name, description, is_active ?? true]
    );
    return result.rows[0];
  }

  // Update badge
  static async update(badgeId, badgeData) {
    const { badge_name, description, is_active } = badgeData;
    const result = await pool.query(
      'UPDATE product_badges SET badge_name = $1, description = $2, is_active = $3 WHERE badge_id = $4 RETURNING *',
      [badge_name, description, is_active, badgeId]
    );
    return result.rows[0];
  }

  // Delete badge
  static async delete(badgeId) {
    const result = await pool.query('DELETE FROM product_badges WHERE badge_id = $1 RETURNING *', [badgeId]);
    return result.rows[0];
  }
}

module.exports = Badge;