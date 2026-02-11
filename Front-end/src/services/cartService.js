const API_BASE_URL = 'http://localhost:3000/api';

export const cartService = {
  addToCart: async (userId, variantId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, variant_id: variantId, quantity })
    });
    return response.json();
  },
  
  getCart: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
    return response.json();
  },
  
  updateCartItem: async (cartItemId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_item_id: cartItemId, quantity })
    });
    return response.json();
  },
  
  removeFromCart: async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
      method: 'DELETE'
    });
    return response.json();
  },
  
  clearCart: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/cart/clear/${userId}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};
