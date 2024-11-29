import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token';
import { postRefreshToken } from '@/services/auth';
import { BASE_URL } from '@/services/config';
import { SESSION, SessionType } from '@/utils/handleSession';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { AxiosError } from 'axios';
import { setAuthCookies } from '@/utils/handleAuthCookie';

const handleRequest = async (
  request: NextRequest,
  params: { path: string[] },
  method: string,
) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;
  const session = cookieStore.get(SESSION)?.value;
  const parsedSession = JSON.parse(session ?? '{}') as SessionType;

  const config = {
    method,
    url: new URL(params.path.join('/'), BASE_URL).toString(),
    headers: {
      Authorization: `Bearer ${accessToken ?? parsedSession.accessToken}`,
    },
    data: method !== 'GET' ? await request.json() : undefined,
  };

  try {
    const response = await axios(config);
    return createApiResponse(response.data, parsedSession);
  } catch (e) {
    const error = e as AxiosError;

    if (error.status !== 401) {
      return createApiResponse(error.response?.data);
    }

    return await handleTokenRefresh(request, error, config);
  }
};

const handleTokenRefresh = async (
  request: NextRequest,
  error: AxiosError,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any,
) => {
  try {
    const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
    if (!refreshToken) {
      return createApiResponse(error.response?.data);
    }

    const newTokens = await postRefreshToken(refreshToken);
    config.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;

    const response = await axios(config);
    return createApiResponse(response.data, newTokens);
  } catch (e) {
    console.error('Route Token Refresh Error: ', e);
    return createApiResponse(error.response?.data);
  }
};

const createApiResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  session?: Partial<SessionType>,
) => {
  const response = NextResponse.json(data);

  if (session?.refreshToken && session?.refreshTokenExpiresAt) {
    setAuthCookies(
      response,
      REFRESH_TOKEN,
      session.refreshToken,
      new Date(session.refreshTokenExpiresAt),
    );
  }
  if (session?.accessToken && session?.accessTokenExpiresAt) {
    setAuthCookies(
      response,
      ACCESS_TOKEN,
      session.accessToken,
      new Date(session.accessTokenExpiresAt),
    );
  }

  if (session?.accessToken || session?.refreshToken) {
    response.cookies.set({
      name: SESSION,
      value: JSON.stringify({
        ...session,
        isLoggedIn: true,
        accessToken: undefined,
        refreshToken: undefined,
        accessTokenExpiresAt: undefined,
        refreshTokenExpiresAt: undefined,
      }),
    });
  }

  return response;
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { path: string[] } },
) => {
  return handleRequest(request, params, 'GET');
};

export const POST = (
  request: NextRequest,
  { params }: { params: { path: string[] } },
) => {
  return handleRequest(request, params, 'POST');
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { path: string[] } },
) => {
  return handleRequest(request, params, 'PUT');
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { path: string[] } },
) => {
  return handleRequest(request, params, 'DELETE');
};
