import axios from 'axios';

const vetApi = axios.create({
  baseURL: `${import.meta.env.VITE_APP_SERVER_URL}/api/veterinary`,
});

const patientApi = axios.create({
  baseURL: `${import.meta.env.VITE_APP_SERVER_URL}/api/patients`,
});

export { vetApi, patientApi };
