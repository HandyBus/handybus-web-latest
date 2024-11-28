import axios from 'axios';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export const authInstance = axios.create({
  baseURL: DOMAIN_URL + 'api',
  timeout: 20000,
});
