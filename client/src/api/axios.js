import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ✅ direct access

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token attached:', token); // Debug
    } else {
      console.warn('⚠️ No token found in localStorage');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
