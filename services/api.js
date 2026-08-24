import axios from 'axios';

var sessionToken = localStorage.getItem('sessionToken')
  ? localStorage.getItem('sessionToken')
  : null;
  
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { Authorization: `Bearer ${sessionToken}` },
});


export default api;