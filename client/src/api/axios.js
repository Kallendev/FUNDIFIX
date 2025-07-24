import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000', // or your deployed backend URL
  withCredentials: true, // if you're using cookies for auth
})

export default instance
