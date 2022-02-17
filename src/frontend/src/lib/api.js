import axios from 'axios';
import { config } from '../config';
import { getTokens, updateTokens } from '@lib/tokenService';

const baseUrl = `${config.API_URL}/`;

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens();
    if (accessToken) {
      config.headers["Authorization"] = 'Bearer ' + accessToken;  
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const get = (url) => {
    return axios.get(`${config.API_URL}/${url}`);
}
  

  // try {
  //   const result = await axiosInstance({
  //     method: 'GET',
  //     url: `${baseUrl}${url}`,
  //   });
  //   return {data: result.data.data};
  // }
  // catch (axiosError) {
  //   console.log(axiosError);
  //   if (axiosError.response.status === 401) {
  //     try {
  //       const token = localStorage.getItem('refreshToken');
  //       const rs = await axiosInstance({
  //         method: 'POST',
  //         url: `${baseUrl}users/refresh-token`,
  //         data: {
  //           refreshToken: token,
  //         },
  //       });
  //       const { accessToken, refreshToken } = rs.data.data;
  //       updateTokens(accessToken, refreshToken);
  //       return axios(axiosError.config.url);
  //     } catch (_error) {
  //       return Promise.reject(_error);
  //     }
  //   }
  //   throw new Error(`status: ${axiosError.response?.status}, data: ${axiosError.response?.data.ErrorMessage}`)
  // }

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
