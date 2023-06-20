import _axios from 'axios';

export const apirecados = _axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'https://apirecados-production.up.railway.app/',
});
