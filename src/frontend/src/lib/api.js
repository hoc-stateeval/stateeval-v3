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
  (request) => {
    const { accessToken } = getTokens();
    if (accessToken) {
      request.headers["Authorization"] = 'Bearer ' + accessToken;  
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const executeRequest = async ({url, method, data}) => {
  try {
    const result = await axiosInstance({
      method,
      url: `${baseUrl}${url}`,
      data: data,
    });

    const login = url.includes('authenticate');
    if (login) {
      const { accessToken, refreshToken } = result.data.data.tokens;
      updateTokens(accessToken, refreshToken);
    }

    return {data: result.data.data};
  }
  catch (axiosError) {
    if (!axiosError.response) {
      throw new Error(`api-error:unknown:${axiosError.message}`);
    }
    if (axiosError.response.status === 401) {
      try {
        const { refreshToken: token } = getTokens();
        const rs = await axiosInstance({
          method: 'POST',
          url: `${baseUrl}users/refresh-token`,
          data: {
            refreshToken: token,
          },
        });
        const { accessToken, refreshToken } = rs.data.data;
        updateTokens(accessToken, refreshToken);
        return axios(axiosError.config.url);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    throw new Error(`api-error:${axiosError.response?.status}:${axiosError.response?.data.ErrorMessage}`)
  }
}

const get = (url) => {
  return executeRequest({
    url: url,
    method: 'GET',
    data: null
  });
}

const post = (url, data) => {
  return executeRequest({
    url: url,
    method: 'POST',
    data: data
  });
}

const put = (url, data) => {
  return executeRequest({
    url: url,
    method: 'PUT',
    data: data
  });
}

export {
  get,
  post,
  put,
  executeRequest,
}
