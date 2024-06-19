import axios from 'axios';
// import dotenv from "dotenv";
// dotenv.config()

const BASE_URL = "https://groove-ai-server.vercel.app"
// const BASE_URL = "http://localhost:3001"
// const BASE_URL = process.env.SERVER_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.error('Failed to fetch JWT token:', error);
  }
  return config;
});

export default axiosInstance;