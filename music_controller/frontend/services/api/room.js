import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api`,
});

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export const createRoom = async (formValues) =>
  await axiosClient.post('/create', formValues);

export const joinRoom = async (roomCode) =>
  await axiosClient.post('/join-room', roomCode);
