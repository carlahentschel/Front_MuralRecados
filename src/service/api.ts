import _axios from 'axios';

export const apirecados = _axios.create({
  baseURL: 'https://api-recados-1h9d.onrender.com/',
});
