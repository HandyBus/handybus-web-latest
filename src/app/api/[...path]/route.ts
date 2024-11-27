import { postRefreshToken } from '@/services/auth';
import { BASE_URL } from '@/services/config';
import {
  ACCESS_EXPIRE_TIME,
  ACCESS_TOKEN,
  OPTIONS,
  REFRESH_EXPIRE_TIME,
  REFRESH_TOKEN,
} from '@/utils/handleToken';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { AxiosError } from 'node_modules/axios/index.cjs';

const handleRequest = async (
  request: NextRequest,
  params: { path: string[] },
  method: string,
) => {
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value ?? '';

  const url = BASE_URL + params.path.join('/');
  const config = {
    method,
    url,
    headers: { Authorization: `Bearer ${accessToken}` },
    data: method !== 'GET' ? await request.json() : undefined,
  };

  try {
    const response = await axios(config);
    const nextResponse = NextResponse.json(response.data);

    return nextResponse;
  } catch (e) {
    const error = e as AxiosError;

    if (error.status !== 401) {
      return NextResponse.json(error.response?.data, {
        status: error.status,
      });
    }

    try {
      const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
      if (!refreshToken) {
        return NextResponse.json(error.response?.data, {
          status: error.status,
        });
      }

      const newTokens = await postRefreshToken(refreshToken);
      const newAccessToken = newTokens.accessToken;
      const newRefreshToken = newTokens.refreshToken;

      config.headers['Authorization'] = `Bearer ${newAccessToken}`;

      const response = await axios(config);
      const nextResponse = NextResponse.json(response.data);

      const refreshExpires = new Date(Date.now() + REFRESH_EXPIRE_TIME);
      const accessExpires = new Date(Date.now() + ACCESS_EXPIRE_TIME);

      nextResponse.cookies.set({
        name: REFRESH_TOKEN,
        value: newRefreshToken,
        expires: refreshExpires,
        ...OPTIONS,
      });
      nextResponse.cookies.set({
        name: ACCESS_TOKEN,
        value: newAccessToken,
        expires: accessExpires,
        ...OPTIONS,
      });

      return nextResponse;
    } catch (e) {
      console.error(e);
      return NextResponse.json(error.response?.data, {
        status: error.status,
      });
    }
  }
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
