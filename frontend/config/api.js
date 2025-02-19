import axios from 'axios';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5000/api';
    }
    return 'http://localhost:5000/api';
  }
  return 'https://your-production-api.com/api'; // Change this for production
};

const BASE_URL = getBaseUrl();
console.log('API Base URL:', BASE_URL); // Debug log

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    console.log('🚀 Request:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    console.log('✅ Response:', response.data);
    return response;
  },
  error => {
    console.error('❌ Response Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    throw error;
  }
); 