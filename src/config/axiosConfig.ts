import axios from 'axios';
import { VITE_BACKEND_URL } from './envconfig';

const axiosInstance = axios.create({
    baseURL:VITE_BACKEND_URL
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;