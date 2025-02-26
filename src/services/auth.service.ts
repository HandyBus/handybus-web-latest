import { instance } from './config';
import { getRefreshToken } from '@/utils/handleToken.util';
import { TokenShape } from '@/types/auth.type';

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
  const res = await instance.post('/v1/auth/login', body, {
    shape: TokenShape,
  });
  return res;
};

// CSR 환경에서만 사용 가능
export const postUpdateToken = async () => {
  const refreshToken = getRefreshToken();
  const res = await instance.post('/v1/auth/refresh', undefined, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    shape: TokenShape,
  });
  return res;
};
