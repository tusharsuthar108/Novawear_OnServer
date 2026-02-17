const Fabric = require('../models/Fabric');

class FabricController {
  // Get all fabrics
  static async getAllFabrics(req, res) {
    try {
      const fabrics = await Fabric.getAll();
      res.json({ success: true, data: fabrics });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get fabric by ID
  static async getFabricById(req, res) {
    try {
      const fabric = await Fabric.getById(req.params.id);
      if (!fabric) {
        return res.status(404).json({ success: false, message: 'Fabric not found' });
      }
      res.json({ success: true, data: fabric });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Create new fabric
  static async createFabric(req, res) {
    try {
      const fabric = await Fabric.create(req.body);
      res.status(201).json({ success: true, data: fabric });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update fabric
  static async updateFabric(req, res) {
    try {
      const fabric = await Fabric.update(req.params.id, req.body);
      if (!fabric) {
        return res.status(404).json({ success: false, message: 'Fabric not found' });
      }
      res.json({ success: true, data: fabric });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete fabric
  static async deleteFabric(req, res) {
    try {
      const fabric = await Fabric.delete(req.params.id);
      if (!fabric) {
        return res.status(404).json({ success: false, message: 'Fabric not found' });
      }
      res.json({ success: true, message: 'Fabric deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = FabricController;