import { Cookies } from 'react-cookie';
import { removeRefreshToken } from './handleToken';

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
  cookieStore.remove(SESSION);
};

export const handleLogout = () => {
  removeSession();
  removeRefreshToken();
};
