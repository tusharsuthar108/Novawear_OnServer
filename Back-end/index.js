const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins during development
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test database connection
try {
  require('./src/config/database');
} catch (error) {
  console.error('❌ Database module error:', error.message);
}

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'NovaWear Backend API is running!', timestamp: new Date().toISOString() });
});

// Test route
app.get('/test', (req, res) => {
  res.json({ status: 'OK', message: 'Server is working!' });
});

// Routes
try {
  const masterCategoriesRoutes = require('./src/routes/masterCategories');
  app.use('/api/master-categories', masterCategoriesRoutes);
  console.log('✅ Master categories routes loaded');
} catch (error) {
  console.error('❌ Routes error:', error.message);
  // Create a fallback route
  app.get('/api/master-categories', (req, res) => {
    res.json({ error: 'Routes not loaded', message: error.message });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Test the API at: http://localhost:${PORT}/test`);
});