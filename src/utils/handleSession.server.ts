import { cookies } from 'next/headers';

const SESSION = 'session';

export interface SessionCookie {
  regionID: number;
}

export const getSession = async (): Promise<SessionCookie | undefined> => {
  const cookieStore = cookies();

  const session = cookieStore.get(SESSION);

  if (!session) {
    return undefined;
  }

  return JSON.parse(session.value) as SessionCookie;
};
