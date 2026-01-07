const Badge = require('../models/Badge');

class BadgeController {
  // Get all badges
  static async getAllBadges(req, res) {
    try {
      const badges = await Badge.getAll();
      res.json({ success: true, data: badges });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get badge by ID
  static async getBadgeById(req, res) {
    try {
      const badge = await Badge.getById(req.params.id);
      if (!badge) {
        return res.status(404).json({ success: false, message: 'Badge not found' });
      }
      res.json({ success: true, data: badge });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Create new badge
  static async createBadge(req, res) {
    try {
      const badge = await Badge.create(req.body);
      res.status(201).json({ success: true, data: badge });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update badge
  static async updateBadge(req, res) {
    try {
      const badge = await Badge.update(req.params.id, req.body);
      if (!badge) {
        return res.status(404).json({ success: false, message: 'Badge not found' });
      }
      res.json({ success: true, data: badge });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete badge
  static async deleteBadge(req, res) {
    try {
      const badge = await Badge.delete(req.params.id);
      if (!badge) {
        return res.status(404).json({ success: false, message: 'Badge not found' });
      }
      res.json({ success: true, message: 'Badge deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = BadgeController;