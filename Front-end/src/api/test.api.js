import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const testBackendConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/test`);
    console.log('Backend test response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Backend connection failed:', error);
    throw error;
  }
};

export const testCategoriesEndpoint = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/categories`);
    console.log('Categories endpoint response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Categories endpoint failed:', error);
    throw error;
  }
};