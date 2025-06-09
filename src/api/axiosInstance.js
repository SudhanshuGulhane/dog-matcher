import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true
});

export default axiosInstance;