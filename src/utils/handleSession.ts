import { Cookies } from 'react-cookie';
import { revalidatePath } from 'next/cache';
import { AuthRequiredPages } from '@/middleware';

export interface SessionType {
  isLoggedIn: boolean;
  accessToken?: string;
  refreshToken?: string;
}

export const SESSION = 'session';

const cookieStore = new Cookies();

export const getSession = () => {
  const session = cookieStore.get<SessionType>(SESSION);
  return session;
};

export const setSession = (session?: Omit<SessionType, 'isLoggedIn'>) => {
  const currSession = getSession();
  const newSession = { ...currSession, ...session, isLoggedIn: true };
  cookieStore.set(SESSION, newSession, { path: '/' });
};

export const removeSession = () => {
  cookieStore.remove(SESSION, { path: '/' });
};

export const handleLogout = () => {
  removeSession();
  AuthRequiredPages.forEach((page) => {
    revalidatePath(page);
  });
};
