require("dotenv").config({ path: require('path').join(__dirname, '../../.env') });
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "NovaWear_db",
  password: process.env.DB_PASSWORD || "admin",
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Database connected successfully");
    release();
  }
});

module.exports = pool;
