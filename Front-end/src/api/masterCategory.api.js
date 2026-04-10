import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/master-categories`;

export const fetchMasterCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateMasterCategory = async (id, formData) => {
  try {
    console.log('API: Updating master category with ID:', id);
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('API: Update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Update error:', error);
    console.error('API: Error response:', error.response);
    throw error.response?.data || { message: "Failed to update master category" };
  }
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