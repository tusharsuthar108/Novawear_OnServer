const db = require('../config/database');
const path = require('path');
const fs = require('fs');

const brandController = {
  getAllBrands: async (req, res) => {
    try {
      const result = await db.query(
        'SELECT * FROM brands ORDER BY created_at DESC'
      );
      res.json({ success: true, data: result.rows });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getBrandById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query(
        'SELECT * FROM brands WHERE brand_id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Brand not found' });
      }
      
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createBrand: async (req, res) => {
    try {
      console.log('=== CREATE BRAND ===');
      console.log('Body:', req.body);
      console.log('File:', req.file);
      
      const { brand_name, description, is_active = true } = req.body;
      
      if (!brand_name) {
        return res.status(400).json({ success: false, error: 'Brand name is required' });
      }
      
      const logo_url = req.file ? `/uploads/brands/${req.file.filename}` : null;
      const brand_slug = brand_name.toLowerCase().replace(/\s+/g, '-');

      console.log('Inserting:', { brand_name, brand_slug, description, logo_url, is_active });

      const result = await db.query(
        'INSERT INTO brands (brand_name, brand_slug, description, logo_url, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [brand_name, brand_slug, description || null, logo_url, is_active === 'true' || is_active === true]
      );

      console.log('Brand created:', result.rows[0]);
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error creating brand:', error.message);
      console.error('Stack:', error.stack);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateBrand: async (req, res) => {
    try {
      const { id } = req.params;
      const { brand_name, description, is_active } = req.body;
      
      let logo_url = req.body.logo_url;
      if (req.file) {
        logo_url = `/uploads/brands/${req.file.filename}`;
      }

      const brand_slug = brand_name ? brand_name.toLowerCase().replace(/\s+/g, '-') : undefined;

      const result = await db.query(
        'UPDATE brands SET brand_name = COALESCE($1, brand_name), brand_slug = COALESCE($2, brand_slug), description = COALESCE($3, description), logo_url = COALESCE($4, logo_url), is_active = COALESCE($5, is_active) WHERE brand_id = $6 RETURNING *',
        [brand_name, brand_slug, description, logo_url, is_active, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Brand not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBrand: async (req, res) => {
    try {
      const { id } = req.params;
      
      const result = await db.query(
        'DELETE FROM brands WHERE brand_id = $1 RETURNING *',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Brand not found' });
      }

      res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = brandController;