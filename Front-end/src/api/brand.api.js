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
    const response = await fetch(`${API_BASE_URL}/brands`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create brand');
    return response.json();
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