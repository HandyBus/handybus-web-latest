import { Cookies } from 'react-cookie';

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
