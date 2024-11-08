import axios, { AxiosError } from 'axios';
import { postRefreshToken } from './auth';
import { setAccessToken, setRefreshToken } from '@/utils/handleToken';
import { removeSession } from '@/utils/handleSession';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

authInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const { config } = error;

    if (error.status === 401 && config) {
      try {
        const newTokens = await postRefreshToken();
        setRefreshToken(newTokens.refreshToken);
        setAccessToken(newTokens.accessToken);

        config.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
        return instance(config);
      } catch (e) {
        const error = e as AxiosError;
        if (error.status === 401) {
          removeSession();
          window.location.href = '/login';
        }
        console.error(error);
      }
    }

    return Promise.reject(error);
  },
);
