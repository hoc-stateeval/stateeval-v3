import axios from 'axios';
import { config } from './config';

console.log(config);

const get = (url) => {
  return axios.get(`${config.API_URL}/${url}`);
}

const post = (url, data) => {
  return axios.post(`${config.API_URL}/${url}`, data);
}

export {
  get,
  post,
}
