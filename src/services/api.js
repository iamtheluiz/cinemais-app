import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.100:3000',
  // baseURL: "https://cinemais-api.luizvasconcellos.com.br"
});

export default api;