const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api`;

export const patternApi = {
  // Get all patterns
  getAllPatterns: async () => {
    const response = await fetch(`${API_BASE_URL}/patterns`);
    return response.json();
  },

  // Create new pattern
  createPattern: async (patternData) => {
    const response = await fetch(`${API_BASE_URL}/patterns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patternData),
    });
    return response.json();
  },

  // Update pattern
  updatePattern: async (patternId, patternData) => {
    const response = await fetch(`${API_BASE_URL}/patterns/${patternId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patternData),
    });
    return response.json();
  },

  // Delete pattern
  deletePattern: async (patternId) => {
    const response = await fetch(`${API_BASE_URL}/patterns/${patternId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};