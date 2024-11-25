import { Cookies } from 'react-cookie';
import { removeRefreshToken } from './handleToken';
import { revalidatePath } from 'next/cache';
import type { SessionCookie } from './handleSession.server';

const SESSION = 'session';

const cookieStore = new Cookies();

export const getSession = async () => {
  const session = await cookieStore.get(SESSION);
  return session;
};

export const setSession = (regionID: number) => {
  cookieStore.set(
    SESSION,
    JSON.stringify({ regionID } satisfies SessionCookie),
    { path: '/' },
  );
};

export const removeSession = () => {
  cookieStore.remove(SESSION, { path: '/' });
};

export const handleLogout = () => {
  removeSession();
  removeRefreshToken();
  revalidatePath('/mypage');
};
