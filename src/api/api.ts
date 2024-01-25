import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:3001',
  baseURL: 'https://db-task-manager.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});
