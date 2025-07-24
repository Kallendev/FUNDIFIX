import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if using cookies/auth
})

export default axiosClient
