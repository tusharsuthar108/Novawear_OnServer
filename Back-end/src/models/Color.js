const pool = require('../config/database');

class Color {
  // Get all colors
  static async getAll() {
    const result = await pool.query('SELECT * FROM colors ORDER BY color_name');
    return result.rows;
  }

  // Get color by ID
  static async getById(colorId) {
    const result = await pool.query('SELECT * FROM colors WHERE color_id = $1', [colorId]);
    return result.rows[0];
  }

  // Create new color
  static async create(colorData) {
    const { color_name, hex_code } = colorData;
    const result = await pool.query(
      'INSERT INTO colors (color_name, hex_code) VALUES ($1, $2) RETURNING *',
      [color_name, hex_code]
    );
    return result.rows[0];
  }

  // Update color
  static async update(colorId, colorData) {
    const { color_name, hex_code } = colorData;
    const result = await pool.query(
      'UPDATE colors SET color_name = $1, hex_code = $2 WHERE color_id = $3 RETURNING *',
      [color_name, hex_code, colorId]
    );
    return result.rows[0];
  }

  // Delete color
  static async delete(colorId) {
    const result = await pool.query('DELETE FROM colors WHERE color_id = $1 RETURNING *', [colorId]);
    return result.rows[0];
  }
}

module.exports = Color;