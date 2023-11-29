import { apiClient } from './service';

const getUsers = (params = '') => {
  return apiClient.get(`/users${params}`);
};

const getUserById = (id) => {
  return apiClient.get(`/users/${id}`);
};

const createUser = (data) => {
  return apiClient.post('/users', data);
};

const updateUser = (data) => {
  return apiClient.patch('/users', data);
};

const getInterviewer = () => {
  return apiClient.get('/users', {
    params: {
      role: 'Interviewer',
    },
  });
};
const getCandidate = () => {
  return apiClient.get('/users', {
    params: {
      role: 'Candidate',
    },
  });
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  getInterviewer,
  getCandidate,
};
