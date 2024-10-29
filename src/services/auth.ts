import { instance } from './config';

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
  const data: { accessToken: string; refreshToken: string } = res.data;
  return data;
};
