const subCategoryService = require('../services/subCategoryService');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/subcategories');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'subcategory-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|avif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get all subcategories with category and master category names
const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await subCategoryService.getAllSubCategories();
    
    res.json({
      success: true,
      data: subCategories
    });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subcategories',
      error: error.message
    });
  }
};

// Create new subcategory
const createSubCategory = async (req, res) => {
  try {
    const { category_id, name, slug, is_active, description } = req.body;
    
    // Validate required fields
    if (!category_id || !name) {
      return res.status(400).json({
        success: false,
        message: 'Category ID and name are required'
      });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/subcategories/${req.file.filename}`;
    }

    const subCategoryData = {
      category_id: parseInt(category_id),
      name,
      slug,
      description: description || null,
      image_url: imageUrl,
      is_active: is_active === 'true' || is_active === true
    };

    const newSubCategory = await subCategoryService.createSubCategory(subCategoryData);

    res.status(201).json({
      success: true,
      message: 'Subcategory created successfully',
      data: newSubCategory
    });
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create subcategory',
      error: error.message
    });
  }
};

// Update subcategory
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, slug, is_active, description, updateImage } = req.body;

    let imageUrl = null;
    if (updateImage === 'true' && req.file) {
      imageUrl = `/uploads/subcategories/${req.file.filename}`;
    }

    const updateData = {
      category_id: parseInt(category_id),
      name,
      slug,
      description: description || null,
      image_url: imageUrl,
      is_active: is_active === 'true' || is_active === true,
      updateImage: updateImage === 'true'
    };

    const updatedSubCategory = await subCategoryService.updateSubCategory(id, updateData);

    if (!updatedSubCategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found'
      });
    }

    res.json({
      success: true,
      message: 'Subcategory updated successfully',
      data: updatedSubCategory
    });
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update subcategory',
      error: error.message
    });
  }
};

// Delete subcategory
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await subCategoryService.deleteSubCategory(id);

    if (!result.deleted) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found'
      });
    }

    // Delete associated image file if exists
    if (result.image_url) {
      const imagePath = path.join(__dirname, '../../', result.image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({
      success: true,
      message: 'Subcategory deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete subcategory',
      error: error.message
    });
  }
};

// Get subcategory by ID
const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await subCategoryService.getSubCategoryById(id);
    
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found'
      });
    }
    
    res.json({
      success: true,
      data: subCategory
    });
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subcategory',
      error: error.message
    });
  }
};

// Get subcategories by category ID
const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await subCategoryService.getSubCategoriesByCategoryId(categoryId);
    
    res.json({
      success: true,
      data: subCategories
    });
  } catch (error) {
    console.error('Error fetching subcategories by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subcategories',
      error: error.message
    });
  }
};

module.exports = {
  getAllSubCategories,
  getSubCategoryById,
  getSubCategoriesByCategoryId,
  createSubCategory: [upload.single('image'), createSubCategory],
  updateSubCategory: [upload.single('image'), updateSubCategory],
  deleteSubCategory
};