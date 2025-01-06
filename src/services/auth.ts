import { instance } from './config';

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
  const res = await instance.post<TokenType>('/v1/auth/login', body);
  return res;
};
