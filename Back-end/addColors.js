const pool = require('./src/config/database');

const colors = [
  { color_name: 'Black', hex_code: '#000000' },
  { color_name: 'White', hex_code: '#FFFFFF' },
  { color_name: 'Red', hex_code: '#FF0000' },
  { color_name: 'Blue', hex_code: '#0000FF' },
  { color_name: 'Green', hex_code: '#008000' },
  { color_name: 'Yellow', hex_code: '#FFFF00' },
  { color_name: 'Pink', hex_code: '#FFC0CB' },
  { color_name: 'Purple', hex_code: '#800080' },
  { color_name: 'Orange', hex_code: '#FFA500' },
  { color_name: 'Brown', hex_code: '#A52A2A' },
  { color_name: 'Gray', hex_code: '#808080' },
  { color_name: 'Navy', hex_code: '#000080' },
  { color_name: 'Maroon', hex_code: '#800000' },
  { color_name: 'Olive', hex_code: '#808000' },
  { color_name: 'Teal', hex_code: '#008080' },
  { color_name: 'Silver', hex_code: '#C0C0C0' },
  { color_name: 'Gold', hex_code: '#FFD700' },
  { color_name: 'Beige', hex_code: '#F5F5DC' },
  { color_name: 'Cream', hex_code: '#FFFDD0' },
  { color_name: 'Khaki', hex_code: '#F0E68C' }
];

async function insertColors() {
  try {
    console.log('🎨 Inserting colors...');
    
    for (const color of colors) {
      await pool.query(
        'INSERT INTO colors (color_name, hex_code) VALUES ($1, $2) ON CONFLICT (color_name) DO NOTHING',
        [color.color_name, color.hex_code]
      );
    }
    
    console.log('✅ Colors inserted successfully');
    
    // Display all colors
    const result = await pool.query('SELECT * FROM colors ORDER BY color_name');
    console.log('\n📋 Available Colors:');
    result.rows.forEach(color => {
      console.log(`${color.color_id}: ${color.color_name} (${color.hex_code})`);
    });
    
  } catch (error) {
    console.error('❌ Error inserting colors:', error.message);
  } finally {
    pool.end();
  }
}

insertColors();