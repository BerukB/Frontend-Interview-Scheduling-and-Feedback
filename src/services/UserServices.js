import { apiClient } from './service';

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
