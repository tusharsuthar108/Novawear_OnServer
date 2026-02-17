const pool = require('../config/database');

exports.getNavigation = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        mc.master_category_id,
        mc.name as master_name,
        mc.slug as master_slug,
        c.category_id,
        c.name as category_name,
        c.slug as category_slug,
        sc.sub_category_id,
        sc.name as sub_category_name,
        sc.slug as sub_category_slug,
        pt.type_id,
        pt.type_name,
        pt.slug as type_slug
      FROM master_categories mc
      LEFT JOIN categories c ON mc.master_category_id = c.master_category_id
      LEFT JOIN sub_categories sc ON c.category_id = sc.category_id
      LEFT JOIN product_types pt ON sc.sub_category_id = pt.sub_category_id
      WHERE mc.is_active = true
      ORDER BY mc.master_category_id, c.category_id, sc.sub_category_id, pt.type_id
    `);

    const navigation = {};
    
    result.rows.forEach(row => {
      const masterId = row.master_category_id;
      
      if (!navigation[masterId]) {
        navigation[masterId] = {
          id: masterId,
          name: row.master_name,
          slug: row.master_slug,
          subCategories: []
        };
      }
      
      if (row.category_id) {
        let category = navigation[masterId].subCategories.find(c => c.id === row.category_id);
        if (!category) {
          category = {
            id: row.category_id,
            name: row.category_name,
            slug: row.category_slug,
            subCategories: []
          };
          navigation[masterId].subCategories.push(category);
        }
        
        if (row.sub_category_id) {
          let subCategory = category.subCategories.find(sc => sc.id === row.sub_category_id);
          if (!subCategory) {
            subCategory = {
              id: row.sub_category_id,
              name: row.sub_category_name,
              slug: row.sub_category_slug,
              types: []
            };
            category.subCategories.push(subCategory);
          }
          
          if (row.type_id) {
            subCategory.types.push({
              id: row.type_id,
              name: row.type_name,
              slug: row.type_slug
            });
          }
        }
      }
    });

    res.json({ success: true, data: Object.values(navigation) });
  } catch (error) {
    console.error('Get Navigation Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
