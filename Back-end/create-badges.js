const pool = require('./src/config/database');

async function createBadgesTable() {
    try {
        console.log('🔄 Creating badges table...');

        // Create badges table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS badges (
                badge_id SERIAL PRIMARY KEY,
                badge_name VARCHAR(50) NOT NULL UNIQUE,
                badge_color VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Badges table created');

        // Insert common badges
        const badges = [
            ['New Arrival', '#3b82f6'],
            ['Best Seller', '#ef4444'],
            ['Trending', '#f59e0b'],
            ['Sale', '#10b981'],
            ['Limited Edition', '#8b5cf6'],
            ['Featured', '#ec4899'],
            ['Hot Deal', '#f97316'],
            ['Exclusive', '#6366f1']
        ];

        for (const [name, color] of badges) {
            await pool.query(
                'INSERT INTO badges (badge_name, badge_color) VALUES ($1, $2) ON CONFLICT (badge_name) DO NOTHING',
                [name, color]
            );
        }
        console.log('✅ Badges inserted');

        // Verify
        const count = await pool.query('SELECT COUNT(*) FROM badges');
        console.log(`\n📊 Total Badges: ${count.rows[0].count}`);
        console.log('✅ Done!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createBadgesTable();
