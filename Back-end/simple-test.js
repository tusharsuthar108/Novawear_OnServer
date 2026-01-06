const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'NovaWear_db',
  password: 'admin',
  port: 5432,
});

console.log('Testing database connection...');

pool.connect()
  .then(client => {
    console.log('✅ Connected to database successfully!');
    return client.query('SELECT version()');
  })
  .then(result => {
    console.log('✅ Database version:', result.rows[0].version);
    return pool.end();
  })
  .catch(err => {
    console.error('❌ Database connection failed:');
    console.error('Error:', err.message);
    console.error('Code:', err.code);
    
    if (err.code === 'ECONNREFUSED') {
      console.log('💡 PostgreSQL server is not running or not accessible');
    } else if (err.code === '28P01') {
      console.log('💡 Authentication failed - check username/password');
    } else if (err.code === '3D000') {
      console.log('💡 Database "NovaWear_db" does not exist');
    }
  });