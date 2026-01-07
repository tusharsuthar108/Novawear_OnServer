const API_BASE_URL = 'http://localhost:3000/api';

export const fabricApi = {
  // Get all fabrics
  getAllFabrics: async () => {
    const response = await fetch(`${API_BASE_URL}/fabrics`);
    return response.json();
  },

  // Create new fabric
  createFabric: async (fabricData) => {
    const response = await fetch(`${API_BASE_URL}/fabrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fabricData),
    });
    return response.json();
  },

  // Update fabric
  updateFabric: async (fabricId, fabricData) => {
    const response = await fetch(`${API_BASE_URL}/fabrics/${fabricId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fabricData),
    });
    return response.json();
  },

  // Delete fabric
  deleteFabric: async (fabricId) => {
    const response = await fetch(`${API_BASE_URL}/fabrics/${fabricId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};