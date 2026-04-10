const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api`;

export const wishlistService = {
  addToWishlist: async (userId, productId) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId })
    });
    return response.json();
  },
  
  getWishlist: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/${userId}`);
    return response.json();
  },
  
  removeFromWishlist: async (userId, productId) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/remove/${productId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });
    return response.json();
  }
};
