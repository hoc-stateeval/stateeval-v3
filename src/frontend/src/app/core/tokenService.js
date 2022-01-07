

const accessTokenKey = 'accessToken';
const refreshTokenKey = 'refreshToken';

const updateTokens = (accessToken, refreshToken) => {
  localStorage.setItem(accessTokenKey, accessToken);
  localStorage.setItem(refreshTokenKey, refreshToken);
}

const getTokens = () => {
  return {
    accessToken: localStorage.getItem(accessTokenKey),
    resfreshToken: localStorage.getItem(refreshTokenKey),
  }
}

const clearTokens = () => {
  localStorage.setItem(accessTokenKey, null);
  localStorage.setItem(refreshTokenKey, null);
}

export {
  updateTokens,
  getTokens,
  clearTokens,
}

