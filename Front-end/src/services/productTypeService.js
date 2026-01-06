import axios from 'axios';

const API_BASE = 'http://localhost:3000';

const productTypeApi = {
  // GET all product types
  getAll: () => axios.get(`${API_BASE}/api/product-types`),

  // POST create new product type
  create: (formData) => axios.post(`${API_BASE}/api/product-types`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // PUT update product type
  update: (id, formData) => axios.put(`${API_BASE}/api/product-types/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // DELETE product type
  delete: (id) => axios.delete(`${API_BASE}/api/product-types/${id}`)
};

export default productTypeApi;