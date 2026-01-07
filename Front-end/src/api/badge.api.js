const API_BASE_URL = 'http://localhost:3000/api';

export const badgeApi = {
  // Get all badges
  getAllBadges: async () => {
    const response = await fetch(`${API_BASE_URL}/badges`);
    return response.json();
  },

  // Create new badge
  createBadge: async (badgeData) => {
    const response = await fetch(`${API_BASE_URL}/badges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(badgeData),
    });
    return response.json();
  },

  // Update badge
  updateBadge: async (badgeId, badgeData) => {
    const response = await fetch(`${API_BASE_URL}/badges/${badgeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(badgeData),
    });
    return response.json();
  },

  // Delete badge
  deleteBadge: async (badgeId) => {
    const response = await fetch(`${API_BASE_URL}/badges/${badgeId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};