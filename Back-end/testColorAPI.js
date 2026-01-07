const express = require('express');
const colorRoutes = require('./src/routes/colorRoutes');
const pool = require('./src/config/database');

const app = express();
app.use(express.json());

// Add color routes
app.use('/api/colors', colorRoutes);

// Test endpoint
app.get('/test-colors', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as total FROM colors');
    res.json({ 
      message: 'Color system working!', 
      total_colors: result.rows[0].total 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🎨 Color API running on port ${PORT}`);
  console.log(`Test: http://localhost:${PORT}/test-colors`);
  console.log(`Colors API: http://localhost:${PORT}/api/colors`);
});

module.exports = app;