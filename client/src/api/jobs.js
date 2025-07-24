import axios from './axios'

export const fetchJobs = async () => {
  const response = await axios.get('/jobs')
  return response.data
}

export const createJob = async (jobData) => {
  const response = await axios.post('/jobs', jobData)
  return response.data
}

// ✅ This is the function that will be used in your register form
export const registerUser = (userData) => {
  return axios.post("/api/users/register", userData);
};

export const loginUser = async (userData) => {
  const res = await axios.post("/api/users/login", userData);
  return res.data;
};