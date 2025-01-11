import axios from 'axios'
import { serverUrl } from '../constant'

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: serverUrl // Your API base URL
})

// Set up a request interceptor to add the token from localStorage
axiosInstance.interceptors.request.use(
  config => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token')
    console.log(token);
    

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
