const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_URL = `${API_BASE_URL}/api/subcategories`;

/**
 * Fetches all subcategories joined with category names.
 * @returns {Promise<Object>} { success: true, data: [] }
 */
export const fetchSubCategories = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw { error: "Failed to fetch subcategories" };
  }
};

/**
 * Creates a new subcategory.
 * @param {Object} subCategoryData - { category_id, name, slug, is_active, description, imageFile }
 */
export const createSubCategory = async (subCategoryData) => {
  try {
    const formData = new FormData();
    formData.append('category_id', subCategoryData.category_id);
    formData.append('name', subCategoryData.name);
    formData.append('slug', subCategoryData.slug);
    formData.append('is_active', subCategoryData.is_active);
    formData.append('description', subCategoryData.description || '');
    
    if (subCategoryData.imageFile) {
      formData.append('image', subCategoryData.imageFile);
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    throw { error: "Failed to create subcategory" };
  }
};

/**
 * Updates an existing subcategory by ID.
 * @param {number|string} id 
 * @param {Object} subCategoryData - { category_id, name, slug, is_active, description, imageFile?, updateImage }
 */
export const updateSubCategory = async (id, subCategoryData) => {
  try {
    const formData = new FormData();
    formData.append('category_id', subCategoryData.category_id);
    formData.append('name', subCategoryData.name);
    formData.append('slug', subCategoryData.slug);
    formData.append('is_active', subCategoryData.is_active);
    formData.append('description', subCategoryData.description || '');
    formData.append('updateImage', subCategoryData.updateImage);
    
    // Only append image if updateImage is true and imageFile exists
    if (subCategoryData.updateImage && subCategoryData.imageFile) {
      formData.append('image', subCategoryData.imageFile);
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    throw { error: "Failed to update subcategory" };
  }
};

/**
 * Deletes a subcategory by ID.
 * @param {number|string} id 
 */
export const deleteSubCategory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    throw { error: "Failed to delete subcategory" };
  }
};