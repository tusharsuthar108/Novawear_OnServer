const API_BASE_URL = 'http://localhost:3000/api';

export const brandAPI = {
  getAllBrands: async () => {
    const response = await fetch(`${API_BASE_URL}/brands`);
    if (!response.ok) throw new Error('Failed to fetch brands');
    return response.json();
  },

  getBrandById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`);
    if (!response.ok) throw new Error('Failed to fetch brand');
    return response.json();
  },

  createBrand: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/brands`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('Brand API createBrand error:', error);
      throw error;
    }
  },

  updateBrand: async (id, formData) => {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update brand');
    return response.json();
  },

  deleteBrand: async (id) => {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete brand');
    }
    return response.json();
  },
};