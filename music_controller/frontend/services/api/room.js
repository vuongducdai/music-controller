import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api`,
});

export const createRoom = async (formValues) =>
  await axiosClient.post('/create', formValues);

export const joinRoom = async (roomCode) =>
  await axiosClient.post('/join-room', roomCode);

export const leaveRoom = async () => await axiosClient.get('/leave-room');
