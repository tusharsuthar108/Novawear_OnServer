const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api`;

export const colorApi = {
  // Get all colors
  getAllColors: async () => {
    const response = await fetch(`${API_BASE_URL}/colors`);
    return response.json();
  },

  // Create new color
  createColor: async (colorData) => {
    const response = await fetch(`${API_BASE_URL}/colors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colorData),
    });
    return response.json();
  },

  // Update color
  updateColor: async (colorId, colorData) => {
    const response = await fetch(`${API_BASE_URL}/colors/${colorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colorData),
    });
    return response.json();
  },

  // Delete color
  deleteColor: async (colorId) => {
    const response = await fetch(`${API_BASE_URL}/colors/${colorId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};