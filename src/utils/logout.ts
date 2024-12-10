'use server';

import { removeAccessToken } from './handleToken';
import { AuthRequiredPages } from '@/middleware';
import { revalidatePath } from 'next/cache';
import { removeRefreshToken } from './handleToken';

export const logout = async () => {
  await Promise.all([removeAccessToken(), removeRefreshToken()]);
  AuthRequiredPages.forEach((page) => {
    revalidatePath(page, 'layout');
  });
};
