const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api`;

export const sizeApi = {
  // Get all sizes
  getAllSizes: async () => {
    const response = await fetch(`${API_BASE_URL}/sizes`);
    return response.json();
  },

  // Create new size
  createSize: async (sizeData) => {
    const response = await fetch(`${API_BASE_URL}/sizes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sizeData),
    });
    return response.json();
  },

  // Update size
  updateSize: async (sizeId, sizeData) => {
    const response = await fetch(`${API_BASE_URL}/sizes/${sizeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sizeData),
    });
    return response.json();
  },

  // Delete size
  deleteSize: async (sizeId) => {
    const response = await fetch(`${API_BASE_URL}/sizes/${sizeId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};