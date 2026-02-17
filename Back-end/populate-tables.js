const pool = require('./src/config/database');

async function populateTables() {
    try {
        console.log('🔄 Creating tables and inserting data...');

        // Create sizes table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS sizes (
                size_id SERIAL PRIMARY KEY,
                size_name VARCHAR(10) NOT NULL UNIQUE,
                size_order INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Sizes table created');

        // Create fabrics table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS fabrics (
                fabric_id SERIAL PRIMARY KEY,
                fabric_name VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Fabrics table created');

        // Create patterns table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS patterns (
                pattern_id SERIAL PRIMARY KEY,
                pattern_name VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Patterns table created');

        // Insert sizes
        const sizes = [
            'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 
            '28', '30', '32', '34', '36', '38', '40', '42'
        ];

        for (const name of sizes) {
            await pool.query(
                'INSERT INTO sizes (size_name) VALUES ($1) ON CONFLICT (size_name) DO NOTHING',
                [name]
            );
        }
        console.log('✅ Sizes inserted');

        // Insert fabrics
        const fabrics = ['Cotton', 'Polyester', 'Linen', 'Silk', 'Wool', 'Denim', 
                        'Leather', 'Nylon', 'Rayon', 'Spandex', 'Velvet', 
                        'Chiffon', 'Satin', 'Jersey', 'Fleece'];

        for (const fabric of fabrics) {
            await pool.query(
                'INSERT INTO fabrics (fabric_name) VALUES ($1) ON CONFLICT (fabric_name) DO NOTHING',
                [fabric]
            );
        }
        console.log('✅ Fabrics inserted');

        // Insert patterns
        const patterns = ['Solid', 'Striped', 'Checked', 'Printed', 'Floral', 
                         'Geometric', 'Polka Dot', 'Abstract', 'Camouflage', 
                         'Paisley', 'Plaid', 'Herringbone', 'Houndstooth', 
                         'Animal Print', 'Tie-Dye'];

        for (const pattern of patterns) {
            await pool.query(
                'INSERT INTO patterns (pattern_name) VALUES ($1) ON CONFLICT (pattern_name) DO NOTHING',
                [pattern]
            );
        }
        console.log('✅ Patterns inserted');

        // Verify data
        const sizeCount = await pool.query('SELECT COUNT(*) FROM sizes');
        const fabricCount = await pool.query('SELECT COUNT(*) FROM fabrics');
        const patternCount = await pool.query('SELECT COUNT(*) FROM patterns');

        console.log('\n📊 Data Summary:');
        console.log(`   Sizes: ${sizeCount.rows[0].count}`);
        console.log(`   Fabrics: ${fabricCount.rows[0].count}`);
        console.log(`   Patterns: ${patternCount.rows[0].count}`);
        console.log('\n✅ All done! You can now restart your backend server.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

populateTables();
