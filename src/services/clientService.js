import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const getClients = () => {
  return apiClient.get("/clients");
};

const createClient = (data) => {
  return apiClient.post("/clients", data);
};

const updateClient = (data) => {
  return apiClient.patch("/clients", data);
};

export { getClients, createClient, updateClient };
