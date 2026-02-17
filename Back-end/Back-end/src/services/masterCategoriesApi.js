const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

const masterCategoriesApi = {
  // GET all master categories
  getAll: () => axios.get(`${API_BASE_URL}/api/master-categories`),

  // POST create new master category
  create: (formData) => axios.post(`${API_BASE_URL}/api/master-categories`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // PUT update master category
  update: (id, formData) => axios.put(`${API_BASE_URL}/api/master-categories/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // DELETE master category
  delete: (id) => axios.delete(`${API_BASE_URL}/api/master-categories/${id}`)
};

module.exports = masterCategoriesApi;