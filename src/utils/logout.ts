'use server';

import { removeAccessToken } from './handleToken';
import { AuthRequiredPages } from '@/middleware';
import { revalidatePath } from 'next/cache';
import { removeRefreshToken } from './handleToken';
import { redirect } from 'next/navigation';

export const logout = async () => {
  removeAccessToken();
  removeRefreshToken();
  AuthRequiredPages.forEach((page) => {
    revalidatePath(page, 'layout');
  });
  redirect('/login');
};
