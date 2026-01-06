import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_URL = `${API_BASE_URL}/api/categories`;

/**
 * Fetches all categories joined with master category names.
 * @returns {Promise<Object>} { success: true, data: [] }
 */
export const fetchCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch categories" };
  }
};

/**
 * Creates a new category.
 * @param {Object} categoryData - { master_category_id, name, slug, description, is_active, imageFile }
 */
export const createCategory = async (categoryData) => {
  try {
    console.log('=== API CREATE CATEGORY DEBUG ===');
    console.log('categoryData received:', categoryData);
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('master_category_id', categoryData.master_category_id);
    formData.append('name', categoryData.name);
    formData.append('slug', categoryData.slug);
    formData.append('description', categoryData.description || '');
    formData.append('is_active', categoryData.is_active);
    
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`- ${key}:`, value);
    }
    
    // Add image file if provided
    if (categoryData.imageFile) {
      formData.append('image', categoryData.imageFile);
      console.log('- image file added:', categoryData.imageFile.name);
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error.response?.data || { error: "Failed to create category" };
  }
};

/**
 * Updates an existing category by ID.
 * @param {number|string} id 
 * @param {Object} categoryData 
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to update category" };
  }
};

/**
 * Deletes a category by ID.
 * @param {number|string} id 
 */
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to delete category" };
  }
};