import axios from "axios";

const API_URL = "http://localhost:3000/api/master-categories";

export const fetchMasterCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteMasterCategory = async (id) => {
  try {
    console.log('API: Deleting master category with ID:', id);
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('API: Delete response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Delete error:', error);
    console.error('API: Error response:', error.response);
    throw error.response?.data || { message: "Failed to delete master category" };
  }
};