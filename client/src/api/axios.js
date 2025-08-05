import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // or your production URL
});

instance.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem('timenode_auth');
    const token = stored ? JSON.parse(stored).token : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
