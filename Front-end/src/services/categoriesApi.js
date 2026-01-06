import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/categories",
});

const categoriesApi = {
  getAll: () => API.get("/"),
  create: (data) => API.post("/", data),
  update: (id, data) => API.put(`/${id}`, data),
  delete: (id) => API.delete(`/${id}`),
};

export default categoriesApi;