const pool = require('../config/database');
const path = require('path');
const fs = require('fs');

class UserProfileController {
  static async getProfile(req, res) {
    try {
      const { userId } = req.params;
      console.log('📥 GET Profile - userId:', userId);
      
      const result = await pool.query(
        'SELECT user_id, full_name, email, phone, profile_image, created_at FROM users WHERE user_id = $1',
        [userId]
      );
      
      if (result.rows.length === 0) {
        console.log('❌ User not found:', userId);
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      console.log('✅ Profile found:', result.rows[0]);
      res.json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('❌ Get profile error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { userId } = req.params;
      const { full_name, email, phone } = req.body;
      console.log('📝 UPDATE Profile - userId:', userId, 'data:', { full_name, email, phone });
      
      if (!full_name || !email || !phone) {
        return res.status(400).json({ success: false, message: 'All fields required' });
      }
      
      const result = await pool.query(
        'UPDATE users SET full_name = $1, email = $2, phone = $3 WHERE user_id = $4 RETURNING user_id, full_name, email, phone, profile_image',
        [full_name, email, phone, userId]
      );
      
      if (result.rows.length === 0) {
        console.log('❌ User not found for update:', userId);
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      console.log('✅ Profile updated:', result.rows[0]);
      res.json({ success: true, data: result.rows[0], message: 'Profile updated successfully' });
    } catch (error) {
      console.error('❌ Update profile error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async uploadProfileImage(req, res) {
    try {
      const { userId } = req.params;
      console.log('📸 UPLOAD Image - userId:', userId);
      
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image file provided' });
      }

      console.log('📁 File received:', req.file.filename);
      
      const userCheck = await pool.query('SELECT profile_image FROM users WHERE user_id = $1', [userId]);
      if (userCheck.rows.length === 0) {
        console.log('❌ User not found for image upload:', userId);
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const oldImage = userCheck.rows[0].profile_image;
      if (oldImage) {
        const oldImagePath = path.join(__dirname, '../../uploads/profiles', path.basename(oldImage));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log('🗑️ Old image deleted');
        }
      }

      const imageUrl = `/uploads/profiles/${req.file.filename}`;
      const result = await pool.query(
        'UPDATE users SET profile_image = $1 WHERE user_id = $2 RETURNING user_id, full_name, email, phone, profile_image',
        [imageUrl, userId]
      );
      
      console.log('✅ Image uploaded:', result.rows[0]);
      res.json({ success: true, data: result.rows[0], message: 'Image uploaded successfully' });
    } catch (error) {
      console.error('❌ Upload image error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = UserProfileController;
