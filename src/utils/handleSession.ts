import { Cookies } from 'react-cookie';
import { removeRefreshToken } from './handleToken';
import { revalidatePath } from 'next/cache';
import { AuthRequiredPages } from '@/middleware';

const SESSION = 'session';

const cookieStore = new Cookies();

export const getSession = async () => {
  const session = await cookieStore.get(SESSION);
  return session;
};

export const setSession = () => {
  cookieStore.set(SESSION, 'true', { path: '/' });
};

export const removeSession = () => {
  cookieStore.remove(SESSION, { path: '/' });
};

export const handleLogout = () => {
  removeSession();
  removeRefreshToken();
  AuthRequiredPages.forEach((page) => {
    revalidatePath(page);
  });
};
