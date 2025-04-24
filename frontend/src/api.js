import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(percentCompleted);
    },
  });
};

export const executeScript = () => {
  return axios.post(`${API_URL}/execute`);
};

export const getSummary = () => {
  return axios.get(`${API_URL}/summary`);
};