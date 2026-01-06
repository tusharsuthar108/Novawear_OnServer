const pool = require('./src/config/database');

const masterCategories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    is_active: true
  },
  {
    name: 'Clothing',
    slug: 'clothing', 
    is_active: true
  },
  {
    name: 'Home & Garden',
    slug: 'home-garden',
    is_active: true
  }
];

async function addMasterCategories() {
  try {
    for (const category of masterCategories) {
      const result = await pool.query(
        `INSERT INTO master_categories (name, slug, is_active, created_at) 
         VALUES ($1, $2, $3, NOW()) 
         ON CONFLICT (slug) DO NOTHING
         RETURNING *`,
        [category.name, category.slug, category.is_active]
      );
      
      if (result.rows.length > 0) {
        console.log(`✅ Added master category: ${category.name}`);
      } else {
        console.log(`⚠️ Master category already exists: ${category.name}`);
      }
    }
    
    console.log('🎉 Master categories setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding master categories:', error);
    process.exit(1);
  }
}

addMasterCategories();