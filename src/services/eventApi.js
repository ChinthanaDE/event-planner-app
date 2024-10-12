import axios from 'axios';

const eventApi = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com', // Use environment variable or default
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default eventApi;
