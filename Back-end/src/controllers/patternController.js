const Pattern = require('../models/Pattern');

class PatternController {
  // Get all patterns
  static async getAllPatterns(req, res) {
    try {
      const patterns = await Pattern.getAll();
      res.json({ success: true, data: patterns });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get pattern by ID
  static async getPatternById(req, res) {
    try {
      const pattern = await Pattern.getById(req.params.id);
      if (!pattern) {
        return res.status(404).json({ success: false, message: 'Pattern not found' });
      }
      res.json({ success: true, data: pattern });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Create new pattern
  static async createPattern(req, res) {
    try {
      const pattern = await Pattern.create(req.body);
      res.status(201).json({ success: true, data: pattern });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update pattern
  static async updatePattern(req, res) {
    try {
      const pattern = await Pattern.update(req.params.id, req.body);
      if (!pattern) {
        return res.status(404).json({ success: false, message: 'Pattern not found' });
      }
      res.json({ success: true, data: pattern });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete pattern
  static async deletePattern(req, res) {
    try {
      const pattern = await Pattern.delete(req.params.id);
      if (!pattern) {
        return res.status(404).json({ success: false, message: 'Pattern not found' });
      }
      res.json({ success: true, message: 'Pattern deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = PatternController;