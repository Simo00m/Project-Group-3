// services/api.js

import axios from 'axios';

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post('http://localhost:7000/login', { username, password });
    return response.data; // Return the data containing the token
  } catch (error) {
    throw new Error('Login failed');
  }
};
