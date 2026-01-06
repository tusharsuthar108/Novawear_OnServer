require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'NovaWear_db',
<<<<<<< HEAD
  password: process.env.DB_PASSWORD || '12345',
=======
  password: process.env.DB_PASSWORD || 'admin',
>>>>>>> 13fcbe1a5025c6bc67f50d8a060d87d4eff359ac
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected successfully');
    release();
  }
});

module.exports = pool;