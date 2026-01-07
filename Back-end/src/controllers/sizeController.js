const Size = require('../models/Size');

class SizeController {
  // Get all sizes
  static async getAllSizes(req, res) {
    try {
      const sizes = await Size.getAll();
      res.json({ success: true, data: sizes });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get size by ID
  static async getSizeById(req, res) {
    try {
      const size = await Size.getById(req.params.id);
      if (!size) {
        return res.status(404).json({ success: false, message: 'Size not found' });
      }
      res.json({ success: true, data: size });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Create new size
  static async createSize(req, res) {
    try {
      const size = await Size.create(req.body);
      res.status(201).json({ success: true, data: size });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update size
  static async updateSize(req, res) {
    try {
      const size = await Size.update(req.params.id, req.body);
      if (!size) {
        return res.status(404).json({ success: false, message: 'Size not found' });
      }
      res.json({ success: true, data: size });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete size
  static async deleteSize(req, res) {
    try {
      const size = await Size.delete(req.params.id);
      if (!size) {
        return res.status(404).json({ success: false, message: 'Size not found' });
      }
      res.json({ success: true, message: 'Size deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = SizeController;