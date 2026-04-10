const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api`;

export const couponService = {
  validateCoupon: async (code, orderAmount) => {
    const response = await fetch(`${API_BASE_URL}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, order_amount: orderAmount })
    });
    return response.json();
  },
  
  getAllCoupons: async () => {
    const response = await fetch(`${API_BASE_URL}/coupons`);
    return response.json();
  },
  
  createCoupon: async (couponData) => {
    const response = await fetch(`${API_BASE_URL}/coupons/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(couponData)
    });
    return response.json();
  }
};
