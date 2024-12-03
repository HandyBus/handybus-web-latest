import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES_AT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_AT,
} from '@/constants/token';
import { postRefreshToken, TokenType } from '@/services/auth';
import { BASE_URL } from '@/services/config';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { AxiosError } from 'axios';
import { setResponseCookies } from '@/utils/handleCookie';

const handleRequest = async (
  request: NextRequest,
  params: { path: string[] },
  method: string,
) => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;
  const refreshTokenExpiresAt = cookieStore.get(
    REFRESH_TOKEN_EXPIRES_AT,
  )?.value;
  const accessTokenExpiresAt = cookieStore.get(ACCESS_TOKEN_EXPIRES_AT)?.value;

  const config = {
    method,
    url: new URL(params.path.join('/'), BASE_URL).toString(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: method !== 'GET' ? await request.json() : undefined,
  };

  try {
    const response = await axios(config);
    return createApiResponse(response.data, {
      refreshToken,
      accessToken,
      refreshTokenExpiresAt,
      accessTokenExpiresAt,
    });
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
  tokens?: Partial<TokenType>,
) => {
  const response = NextResponse.json(data);

  if (tokens?.refreshToken && tokens?.refreshTokenExpiresAt) {
    setResponseCookies(
      response,
      REFRESH_TOKEN,
      tokens.refreshToken,
      new Date(tokens.refreshTokenExpiresAt),
    );
    setResponseCookies(
      response,
      REFRESH_TOKEN_EXPIRES_AT,
      tokens.refreshTokenExpiresAt,
      new Date(tokens.refreshTokenExpiresAt),
    );
  }
  if (tokens?.accessToken && tokens?.accessTokenExpiresAt) {
    setResponseCookies(
      response,
      ACCESS_TOKEN,
      tokens.accessToken,
      new Date(tokens.accessTokenExpiresAt),
    );
    setResponseCookies(
      response,
      ACCESS_TOKEN_EXPIRES_AT,
      tokens.accessTokenExpiresAt,
      new Date(tokens.accessTokenExpiresAt),
    );
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
