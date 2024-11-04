import { getRefreshToken } from '@/utils/handleToken';
import { instance } from './config';

interface TokenType {
  accessToken: string;
  refreshToken: string;
}

export const postLogin = async (
  method: 'kakao' | 'naver',
  { code, state }: { code: string; state?: string },
) => {
  const body = {
    authChannel: method,
    naverUserRequest:
      method === 'naver'
        ? {
            code,
            state,
          }
        : undefined,
    kakaoUserRequest:
      method === 'kakao'
        ? {
            code,
          }
        : undefined,
  };
  const res = await instance.post('/auth', body);
  const data: TokenType = res.data;
  return data;
};

export const postRefreshToken = async () => {
  const refreshToken = getRefreshToken();
  const res = await instance.post('/auth/refresh', undefined, {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  const data: TokenType = res.data;
  return data;
};
