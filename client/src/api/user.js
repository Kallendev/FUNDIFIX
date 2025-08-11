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
};// src/api/user.js

// ✅ Update user profile (with image upload)
export const updateUserProfile = async (data) => {
  const formData = new FormData();
  
  if (data.profileImage) {
    formData.append('profileImage', data.profileImage);
  }
  formData.append('name', data.name || '');
  formData.append('skills', data.skills || '');
  formData.append('experience', data.experience || '');
  formData.append('location', data.location || '');

  const response = await instance.put('/users/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};

