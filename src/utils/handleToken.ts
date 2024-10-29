import { authInstance } from '@/services/config';

const REFRESH_TOKEN = 'refresh-token';

export const getRefreshToken = () => {
  const value = localStorage.getItem(REFRESH_TOKEN);
  return value;
};

export const setRefreshToken = async (value: string) => {
  localStorage.setItem(REFRESH_TOKEN, value);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};

export const setAccessToken = (token: string) => {
  authInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
