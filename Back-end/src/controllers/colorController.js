const Color = require('../models/Color');

class ColorController {
  // Get all colors
  static async getAllColors(req, res) {
    try {
      const colors = await Color.getAll();
      res.json({ success: true, data: colors });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get color by ID
  static async getColorById(req, res) {
    try {
      const color = await Color.getById(req.params.id);
      if (!color) {
        return res.status(404).json({ success: false, message: 'Color not found' });
      }
      res.json({ success: true, data: color });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Create new color
  static async createColor(req, res) {
    try {
      const color = await Color.create(req.body);
      res.status(201).json({ success: true, data: color });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update color
  static async updateColor(req, res) {
    try {
      const color = await Color.update(req.params.id, req.body);
      if (!color) {
        return res.status(404).json({ success: false, message: 'Color not found' });
      }
      res.json({ success: true, data: color });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete color
  static async deleteColor(req, res) {
    try {
      const color = await Color.delete(req.params.id);
      if (!color) {
        return res.status(404).json({ success: false, message: 'Color not found' });
      }
      res.json({ success: true, message: 'Color deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = ColorController;