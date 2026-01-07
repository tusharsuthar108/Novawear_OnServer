const pool = require('../config/database');

class Size {
  // Get all sizes
  static async getAll() {
    const result = await pool.query('SELECT * FROM sizes ORDER BY size_name');
    return result.rows;
  }

  // Get size by ID
  static async getById(sizeId) {
    const result = await pool.query('SELECT * FROM sizes WHERE size_id = $1', [sizeId]);
    return result.rows[0];
  }

  // Create new size
  static async create(sizeData) {
    const { size_name } = sizeData;
    const result = await pool.query(
      'INSERT INTO sizes (size_name) VALUES ($1) RETURNING *',
      [size_name]
    );
    return result.rows[0];
  }

  // Update size
  static async update(sizeId, sizeData) {
    const { size_name } = sizeData;
    const result = await pool.query(
      'UPDATE sizes SET size_name = $1 WHERE size_id = $2 RETURNING *',
      [size_name, sizeId]
    );
    return result.rows[0];
  }

  // Delete size
  static async delete(sizeId) {
    const result = await pool.query('DELETE FROM sizes WHERE size_id = $1 RETURNING *', [sizeId]);
    return result.rows[0];
  }
}

module.exports = Size;