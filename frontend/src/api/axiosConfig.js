import axios from 'axios';

// Lee VITE_API_URL del .env → http://localhost:3005/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3005/api',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
