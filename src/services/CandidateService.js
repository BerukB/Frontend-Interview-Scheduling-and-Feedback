import { apiClient } from './service';

const getCandidates = () => {
  return apiClient.get('/candidates');
};

const getCandidateById = (id) => {
  return apiClient.get(`/candidates/${id}`);
};

const createCandidate = (data) => {
  return apiClient.post('/candidates', data);
};

const updateCandidate = (data) => {
  return apiClient.patch('/candidates', data);
};

export { getCandidates, getCandidateById, createCandidate, updateCandidate };
