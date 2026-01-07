const API_BASE_URL = 'http://localhost:3000/api';

export const productBadgeApi = {
  // Get all products with their badges
  getProductsWithBadges: async () => {
    const response = await fetch(`${API_BASE_URL}/product-badges/products-badges`);
    return await response.json();
  },

  // Get badges for specific product
  getProductBadges: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/product-badges/products/${productId}/badges`);
    return await response.json();
  },

  // Add badge to product
  addBadgeToProduct: async (productId, badgeId) => {
    const response = await fetch(`${API_BASE_URL}/product-badges/products/badges/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, badgeId }),
    });
    return await response.json();
  },

  // Remove badge from product
  removeBadgeFromProduct: async (productId, badgeId) => {
    const response = await fetch(`${API_BASE_URL}/product-badges/products/badges/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, badgeId }),
    });
    return await response.json();
  },

  // Get all available badges
  getAvailableBadges: async () => {
    const response = await fetch(`${API_BASE_URL}/product-badges/badges/available`);
    return await response.json();
  }
};