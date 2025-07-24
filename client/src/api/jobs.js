import axios from './axios'

export const fetchJobs = async () => {
  const response = await axios.get('/jobs')
  return response.data
}

export const createJob = async (jobData) => {
  const response = await axios.post('/jobs', jobData)
  return response.data
}
