import axios from 'axios';

const API_BASE = 'http://localhost:3000';

const masterCategoriesApi = {
  // GET all master categories
  getAll: () => axios.get(`${API_BASE}/api/master-categories`),

  // POST create new master category
  create: (formData) => axios.post(`${API_BASE}/api/master-categories`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // PUT update master category
  update: (id, formData) => axios.put(`${API_BASE}/api/master-categories/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // DELETE master category
  delete: (id) => axios.delete(`${API_BASE}/api/master-categories/${id}`)
};

export default masterCategoriesApi;