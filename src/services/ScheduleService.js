import { apiClient } from './service';

const getSchedules = (params = '') => {
  return apiClient.get(`/schedules?${params}`);
};

const getScheduleById = (id) => {
  return apiClient.get(`/schedules/${id}`);
};

const createSchedule = (data) => {
  return apiClient.post('/schedules', data);
};

const updateSchedule = (id, data) => {
  return apiClient.patch(`/schedules/${id}`, data);
};

export { getSchedules, getScheduleById, createSchedule, updateSchedule };
