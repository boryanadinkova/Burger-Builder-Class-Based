import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://burgerbuilderwithreact-d0b0e.firebaseio.com/'
});

export default axiosInstance;