import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDk5MWM4ZTYyOTU2MjJmODU2ZWRkOCIsImlhdCI6MTcwMTI2MDY0MiwiZXhwIjoxNzAxMzQ3MDQyfQ.rRlQsq7f1meqoKoqfS0WvE_wQ1Ta2FmUqp2rLJJPGlA`,
  },
});

export { apiClient };
