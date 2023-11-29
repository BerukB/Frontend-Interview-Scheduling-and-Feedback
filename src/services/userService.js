import axios from "axios";

const apiUser = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njc0NmYwOGM5NTJmOGQxMjRkNDQ4OSIsImlhdCI6MTcwMTI2OTAyNCwiZXhwIjoxNzAxMzU1NDI0fQ.IgM-hwBk13u7Or3EFIXR316BCKxEVtprB1zXMBmoiHk"
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
const getCandidate = () => {
  return apiUser.get("/users",  {
    params: {
      role: "Candidate"
    },
  });
};

const createUser = (data) => {
  return apiUser.post("/users", data);
};

const updateUser = (data) => {
  return apiUser.patch("/users", data);
};

export { getUsers, createUser, updateUser, getInterviewer,getCandidate };
