const pool = require('../config/database');

class Pattern {
  // Get all patterns
  static async getAll() {
    const result = await pool.query('SELECT * FROM patterns ORDER BY pattern_name');
    return result.rows;
  }

  // Get pattern by ID
  static async getById(patternId) {
    const result = await pool.query('SELECT * FROM patterns WHERE pattern_id = $1', [patternId]);
    return result.rows[0];
  }

  // Create new pattern
  static async create(patternData) {
    const { pattern_name } = patternData;
    const result = await pool.query(
      'INSERT INTO patterns (pattern_name) VALUES ($1) RETURNING *',
      [pattern_name]
    );
    return result.rows[0];
  }

  // Update pattern
  static async update(patternId, patternData) {
    const { pattern_name } = patternData;
    const result = await pool.query(
      'UPDATE patterns SET pattern_name = $1 WHERE pattern_id = $2 RETURNING *',
      [pattern_name, patternId]
    );
    return result.rows[0];
  }

  // Delete pattern
  static async delete(patternId) {
    const result = await pool.query('DELETE FROM patterns WHERE pattern_id = $1 RETURNING *', [patternId]);
    return result.rows[0];
  }
}

module.exports = Pattern;