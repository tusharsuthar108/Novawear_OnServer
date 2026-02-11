const API_BASE_URL = 'http://localhost:3000/api';

export const addressService = {
  createAddress: async (addressData) => {
    const response = await fetch(`${API_BASE_URL}/addresses/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressData)
    });
    return response.json();
  },
  
  getUserAddresses: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/addresses/${userId}`);
    return response.json();
  },
  
  updateAddress: async (addressId, addressData) => {
    const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressData)
    });
    return response.json();
  },
  
  deleteAddress: async (addressId) => {
    const response = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};
