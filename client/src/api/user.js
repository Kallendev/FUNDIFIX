// src/api/user.js
import instance from './axios';

export const registerUser = async (userData) => {
  try {
    const response = await instance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};
// src/api/user.js
export const loginUser = async (credentials) => {
  try {
    const response = await instance.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
