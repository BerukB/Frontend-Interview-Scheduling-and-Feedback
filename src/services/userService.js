import axios from "axios";

const apiUser = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const getUsers = () => {
  return apiUser.get("/users");
};
const getInterviewer = () => {
  return apiUser.get("/users",  {
    params: {
      role: "Interviewer"
    },
  });
};

const createUser = (data) => {
  return apiUser.post("/users", data);
};

const updateUser = (data) => {
  return apiUser.patch("/users", data);
};

export { getUsers, createUser, updateUser, getInterviewer };
