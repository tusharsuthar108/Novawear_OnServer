const API_BASE_URL = 'http://localhost:3000/api';

export const reviewService = {
  createReview: async (userId, productId, rating, comment) => {
    const response = await fetch(`${API_BASE_URL}/reviews/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, product_id: productId, rating, comment })
    });
    return response.json();
  },
  
  getProductReviews: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${productId}`);
    return response.json();
  },
  
  updateReview: async (reviewId, rating, comment) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment })
    });
    return response.json();
  },
  
  deleteReview: async (reviewId) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};
