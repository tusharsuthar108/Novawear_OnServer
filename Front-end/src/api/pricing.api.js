const API_BASE_URL = 'http://localhost:3000/api/pricing';

// Pricing Plans API
export const fetchPricingPlans = async () => {
  const response = await fetch(`${API_BASE_URL}/plans`);
  if (!response.ok) throw new Error('Failed to fetch pricing plans');
  return response.json();
};

export const createPricingPlan = async (planData) => {
  const response = await fetch(`${API_BASE_URL}/plans`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(planData)
  });
  if (!response.ok) throw new Error('Failed to create pricing plan');
  return response.json();
};

export const deletePricingPlan = async (id) => {
  const response = await fetch(`${API_BASE_URL}/plans/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete pricing plan');
  return response.json();
};

// Coupons API
export const fetchCoupons = async () => {
  const response = await fetch(`${API_BASE_URL}/coupons`);
  if (!response.ok) throw new Error('Failed to fetch coupons');
  return response.json();
};

export const createCoupon = async (couponData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(couponData)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return result;
  } catch (error) {
    console.error('Create coupon error:', error);
    throw error;
  }
};

export const deleteCoupon = async (id) => {
  const response = await fetch(`${API_BASE_URL}/coupons/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete coupon');
  return response.json();
};

// Taxes API
export const fetchTaxes = async () => {
  const response = await fetch(`${API_BASE_URL}/taxes`);
  if (!response.ok) throw new Error('Failed to fetch taxes');
  return response.json();
};

export const createTax = async (taxData) => {
  const response = await fetch(`${API_BASE_URL}/taxes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taxData)
  });
  if (!response.ok) throw new Error('Failed to create tax');
  return response.json();
};

export const deleteTax = async (id) => {
  const response = await fetch(`${API_BASE_URL}/taxes/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete tax');
  return response.json();
};

// Fees API
export const fetchFees = async () => {
  const response = await fetch(`${API_BASE_URL}/fees`);
  if (!response.ok) throw new Error('Failed to fetch fees');
  return response.json();
};

export const createFee = async (feeData) => {
  const response = await fetch(`${API_BASE_URL}/fees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feeData)
  });
  if (!response.ok) throw new Error('Failed to create fee');
  return response.json();
};

export const deleteFee = async (id) => {
  const response = await fetch(`${API_BASE_URL}/fees/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete fee');
  return response.json();
};