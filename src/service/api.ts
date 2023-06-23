import _axios from 'axios';

export const apirecados = _axios.create({
  baseURL: 'https://apirecados-production.up.railway.app/',
});
