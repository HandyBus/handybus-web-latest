import axios, { AxiosError } from 'axios';

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
    if (error.status !== 401) {
      return Promise.reject(error);
    }

    // 토큰 만료 시 토큰 재발급 로직 - 추후 백엔드 refresh 로직 완성되면 수정하여 적용 예정
    // try {
    //   const config = error.config;
    //   const newToken = await postRefreshToken();
    //   setRefreshToken(newToken.refreshToken);

    //   const response = await axios({
    //     ...config,
    //     headers: { Authorization: `Bearer ${newToken.accessToken}` },
    //   });
    //   return await Promise.resolve(response);
    // } catch (e) {
    //   console.error(e);
    // }
  },
);

export const setAuthHeader = (token: string) => {
  authInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
