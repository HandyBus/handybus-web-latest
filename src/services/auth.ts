import { BASE_URL, instance } from './config';

export interface TokenType {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
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
  const res = await instance.post('/auth/login', body);
  const data: TokenType = res.data;
  return data;
};

export const postRefreshToken = async (refreshToken: string) => {
  const res = await fetch(new URL('/auth/refresh', BASE_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const data: TokenType = await res.json();
  return data;
};
