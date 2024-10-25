import { getRefreshToken } from '@/utils/handleToken';
import axios from 'axios';

export const postRefreshToken = async () => {
  const refreshToken = getRefreshToken();

  const res = await axios.post('/auth/refresh', undefined, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  const token: { accessToken: string; refreshToken: string } = res.data;
  return token;
};
