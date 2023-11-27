import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getUsers = () => {
  return apiClient.get('/users');
};

const createUser = (data) => {
  return apiClient.post('/users', data);
};

const updateUser = (data) => {
  return apiClient.patch('/users', data);
};

export { getUsers, createUser, updateUser };
