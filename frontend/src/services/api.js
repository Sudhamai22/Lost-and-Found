import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Items
export const getItems = (params) => API.get('/items', { params });
export const getItemById = (id) => API.get(`/items/${id}`);
export const getMyItems = () => API.get('/items/my');
export const createItem = (data) => API.post('/items', data);
export const updateItem = (id, data) => API.put(`/items/${id}`, data);
export const updateItemStatus = (id, status) => API.patch(`/items/${id}/status`, { status });
export const deleteItem = (id) => API.delete(`/items/${id}`);
