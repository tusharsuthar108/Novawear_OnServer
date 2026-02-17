const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategory.controller');

// GET /api/subcategories - Get all subcategories
router.get('/', subCategoryController.getAllSubCategories);

// GET /api/subcategories/:id - Get subcategory by ID
router.get('/:id', subCategoryController.getSubCategoryById);

// GET /api/subcategories/category/:categoryId - Get subcategories by category ID
router.get('/category/:categoryId', subCategoryController.getSubCategoriesByCategoryId);

// POST /api/subcategories - Create new subcategory
router.post('/', subCategoryController.createSubCategory);

// PUT /api/subcategories/:id - Update subcategory
router.put('/:id', subCategoryController.updateSubCategory);

// DELETE /api/subcategories/:id - Delete subcategory
router.delete('/:id', subCategoryController.deleteSubCategory);

module.exports = router;