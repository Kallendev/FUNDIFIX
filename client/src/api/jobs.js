// src/api/jobs.ts or user.ts

import axios from './axios'; // This is your preconfigured axios instance

// Fetch all jobs (Public route)
export const getAllJobs = async () => {
  try {
    const response = await axios.get('/jobs'); // ✅ use axios here
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch jobs' };
  }
};

// Create a new job (Protected route, token added by interceptor)
export const createJob = async (jobData) => {
  try {
    const response = await axios.post('/jobs', jobData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create job' };
  }
};

// Register a new user (Public)
export const registerUser = async (userData) => {
  const response = await axios.post('/users/register', userData);
  return response.data;
};

// Login user (Public)
export const loginUser = async (userData) => {
  const response = await axios.post('/users/login', userData);
  return response.data;
};
