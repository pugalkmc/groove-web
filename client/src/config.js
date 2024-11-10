import axios from 'axios';

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://groove-ai-server.vercel.app"

const axiosInstance = axios.create({
  withCredentials: true, // Ensure cookies are sent with cross-origin requests
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Failed to fetch JWT token:', error);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Check if the error is due to unauthorized access (401 status code)
    if (error.response && error.response.status === 401) {
      // Clear any user tokens or session data
      localStorage.clear()

      // Show an alert message to the user
      alert('Your login session expired or you are not authorized. Please log in again.');

      // Redirect the user to the login page
      window.location.href = '/login';
    }

    // Return the error to continue handling in your application
    return Promise.reject(error);
  }
);

export default axiosInstance;
