const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Simple test routes
app.get('/', (req, res) => {
  res.json({ message: 'Server is working!', time: new Date() });
});

app.get('/test', (req, res) => {
  res.json({ status: 'OK', message: 'Test endpoint working!' });
});

app.get('/api/master-categories', (req, res) => {
  res.json([
    { id: 1, name: 'Test Category', is_active: true }
  ]);
});

app.listen(PORT, () => {
  console.log(`🚀 Simple server running on http://localhost:${PORT}`);
  console.log(`📡 Test at: http://localhost:${PORT}/test`);
});