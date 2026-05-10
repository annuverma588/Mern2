import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getStoredAuth = () => {
  try {
    return JSON.parse(localStorage.getItem("auth")) || null;
  } catch {
    return null;
  }
};

export const getToken = () => getStoredAuth()?.token || "";

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || "Request failed";
    return Promise.reject(new Error(message));
  }
);

export const authApi = {
  login: (payload) => client.post("/users/login", payload),
  register: (payload) => client.post("/users/register", payload),
  profile: () => client.get("/users/profile"),
};

export const productApi = {
  list: (query = "") => client.get(`/products${query}`),
  details: (id) => client.get(`/products/${id}`),
  similar: (id) => client.get(`/products/similar/${id}`),
  newArrivals: () => client.get("/products/new-arrivals"),
  create: (payload) => client.post("/products", payload),
  update: (id, payload) => client.put(`/products/${id}`, payload),
  remove: (id) => client.delete(`/products/${id}`),
  review: (id, payload) => client.post(`/products/${id}/reviews`, payload),
};

export const userApi = {
  list: () => client.get("/users"),
  create: (payload) => client.post("/users", payload),
  update: (id, payload) => client.put(`/users/${id}`, payload),
  remove: (id) => client.delete(`/users/${id}`),
};

export const orderApi = {
  listMine: () => client.get("/orders/mine"),
  listAll: () => client.get("/orders"),
  details: (id) => client.get(`/orders/${id}`),
  create: (payload) => client.post("/orders", payload),
  update: (id, payload) => client.put(`/orders/${id}`, payload),
};

export const wishlistApi = {
  list: () => client.get("/wishlist"),
  toggle: (productId) => client.post("/wishlist", { productId }),
};

export const paymentApi = {
  createOrder: (orderId) => client.post("/payments/create-order", { orderId }),
  verify: (payload) => client.post("/payments/verify", payload),
};

export default client;
