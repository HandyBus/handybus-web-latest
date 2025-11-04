import { authInstance, instance } from './config';
import { getRefreshToken } from '@/utils/handleToken.util';
import { TokenShape } from '@/types/auth.type';

// ----- POST -----

export const postLogin = async (
  method: 'kakao' | 'naver' | 'apple',
  { code }: { code: string },
) => {
  const body = {
    authChannel: method,
    naverUserRequest:
      method === 'naver'
        ? {
            code,
            // NOTE: state를 앱 진입 판별 용도로 사용하며 state은 백엔드 상에서 사용 X
          }
        : undefined,
    kakaoUserRequest:
      method === 'kakao'
        ? {
            code,
          }
        : undefined,
    appleUserRequest:
      method === 'apple'
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

// CSR 환경에서만 사용 가능
export const postIdentityVerification = async (body: {
  identityVerificationId: string;
}) => {
  return await authInstance.post('/v1/auth/identity-verification', body, {
    skipCheckOnboarding: true,
  });
};
