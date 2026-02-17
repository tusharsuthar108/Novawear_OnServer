const API_BASE_URL = 'http://localhost:3000/api';

export const productAPI = {
  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  getProductVariants: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/variants`);
    if (!response.ok) throw new Error('Failed to fetch product variants');
    return response.json();
  },

  updateProduct: async (id, formData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update product');
    }
    return response.json();
  },

  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Check backend logs.');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to delete product');
      }
      
      return data;
    } catch (error) {
      console.error('Delete product error:', error);
      throw error;
    }
  },
};