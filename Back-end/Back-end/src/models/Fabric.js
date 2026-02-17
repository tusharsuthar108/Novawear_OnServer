const pool = require('../config/database');

class Fabric {
  // Get all fabrics
  static async getAll() {
    const result = await pool.query('SELECT * FROM fabrics ORDER BY fabric_name');
    return result.rows;
  }

  // Get fabric by ID
  static async getById(fabricId) {
    const result = await pool.query('SELECT * FROM fabrics WHERE fabric_id = $1', [fabricId]);
    return result.rows[0];
  }

  // Create new fabric
  static async create(fabricData) {
    const { fabric_name } = fabricData;
    const result = await pool.query(
      'INSERT INTO fabrics (fabric_name) VALUES ($1) RETURNING *',
      [fabric_name]
    );
    return result.rows[0];
  }

  // Update fabric
  static async update(fabricId, fabricData) {
    const { fabric_name } = fabricData;
    const result = await pool.query(
      'UPDATE fabrics SET fabric_name = $1 WHERE fabric_id = $2 RETURNING *',
      [fabric_name, fabricId]
    );
    return result.rows[0];
  }

  // Delete fabric
  static async delete(fabricId) {
    const result = await pool.query('DELETE FROM fabrics WHERE fabric_id = $1 RETURNING *', [fabricId]);
    return result.rows[0];
  }
}

module.exports = Fabric;