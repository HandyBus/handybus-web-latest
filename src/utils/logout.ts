'use server';

import { removeAccessToken } from './handleToken';
import { revalidatePath } from 'next/cache';
import { removeRefreshToken } from './handleToken';

export const logout = async () => {
  await Promise.all([removeAccessToken(), removeRefreshToken()]);
  revalidatePath('/mypage', 'layout');
};
