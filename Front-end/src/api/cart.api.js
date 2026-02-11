const API_URL = 'http://localhost:3000/api/cart';

export const cartAPI = {
  // Add item to cart
  addToCart: async (userId, variantId, quantity = 1) => {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, variant_id: variantId, quantity })
    });
    return response.json();
  },

  // Get user cart
  getCart: async (userId) => {
    const response = await fetch(`${API_URL}/${userId}`);
    return response.json();
  },

  // Update cart item quantity
  updateCartItem: async (cartItemId, quantity) => {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_item_id: cartItemId, quantity })
    });
    return response.json();
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    const response = await fetch(`${API_URL}/remove/${itemId}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Clear cart
  clearCart: async (userId) => {
    const response = await fetch(`${API_URL}/clear/${userId}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};
