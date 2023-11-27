import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getSchedules = (params = '') => {
  console.log('params', params);
  return apiClient.get(`/schedules?${params}`);
};

const createSchedule = (data) => {
  return apiClient.post('/schedules', data);
};

const updateSchedule = (data) => {
  console.log('UPDATE', data);
  return apiClient.patch('/schedules', data);
};

export { getSchedules, createSchedule, updateSchedule };
