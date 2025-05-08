import axios from 'axios';


const TIME_OUT = 10000;

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;


axiosClient.interceptors.request.use(
  function (config) {

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
)

axiosClient.interceptors.response.use(
  function (response) {

    return response.data;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
)