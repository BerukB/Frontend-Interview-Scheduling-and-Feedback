import { apiClient } from './service';

const getClients = () => {
  return apiClient.get('/clients');
};

const createClient = (data) => {
  return apiClient.post('/clients', data);
};

const updateClient = (data) => {
  return apiClient.patch('/clients', data);
};

export { getClients, createClient, updateClient };
