import { z } from 'zod';

// NOTE: instance의 shape 옵션에 맞추기 위해 zod object으로 감싸지 않음
export const TokenShape = {
  accessToken: z.string(),
  refreshToken: z.string(),
  accessTokenExpiresAt: z.string(),
  refreshTokenExpiresAt: z.string(),
};
