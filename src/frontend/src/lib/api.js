import axios from 'axios';
import { config } from '../config';

const get = (url) => {
  return axios.get(`${config.API_URL}/${url}`);
}

const post = (url, data) => {
  return axios.post(`${config.API_URL}/${url}`, data);
}

const put = (url, data) => {
  if (data) {
    return axios.put(`${config.API_URL}/${url}`, data);
  }
  return axios.put(`${config.API_URL}/${url}`);
}

export {
  get,
  post,
  put,
}
