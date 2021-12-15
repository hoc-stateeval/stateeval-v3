import axios from 'axios';
import { config } from './config';

console.log(config);

const get = (url, data) => {
  if (data) {
    return axios.get(`${config.API_URL}/${url}`, data);
  }

  return axios.get(`${config.API_URL}/${url}`);
}

export {
  get,
}
