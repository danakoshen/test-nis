import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tests';

export const fetchTests = () => axios.get(API_URL);
export const createTest = (test) => axios.post(API_URL, test);
export const fetchTestById = (id) => axios.get(`${API_URL}/${id}`);

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getTests() {
    return apiClient.get('/tests', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  },
  createTest(test) {
    return apiClient.post('/tests', test, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  },
  updateTest(id, test) {
    return apiClient.put(`/tests/${id}`, test, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  },
  deleteTest(id) {
    return apiClient.delete(`/tests/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  },
  submitTestResults(id, results) {
    return apiClient.post(`/results/${id}/check`, results, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  },
  login(username, password) {
    return apiClient.post('/auth/login', { username, password });
  }
};