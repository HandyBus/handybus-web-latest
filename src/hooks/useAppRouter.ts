'use client';

import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * @requires Suspense로 감싸져 있어야 함
 */

const useAppRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isApp = searchParams.get(ACCESS_ENV) === 'app';

  const push = (href: string, options?: NavigateOptions) => {
    const loginPath = createAppRedirectPath(href, { isApp });
    router.push(loginPath, options);
  };

  const replace = (href: string, options?: NavigateOptions) => {
    const loginPath = createAppRedirectPath(href, { isApp });
    router.replace(loginPath, options);
  };

  const back = () => {
    router.back();
  };

  return { isApp, push, replace, back };
};

export default useAppRouter;

const ACCESS_ENV = 'access-env';

export const createAppRedirectPath = (
  href: string,
  options: {
    isApp: boolean;
  },
) => {
  const { isApp } = options;
  if (!isApp) {
    return href;
  }

  const [path, query] = href.split('?');
  const pathString = path.startsWith('/') ? path : `/${path}`;

  const existingParams = query
    ? new URLSearchParams(query)
    : new URLSearchParams();

  existingParams.set(ACCESS_ENV, 'app');

  const queryString = existingParams.toString();
  return queryString ? `${pathString}?${queryString}` : pathString;
};

export const getIsApp = (searchParams: URLSearchParams) => {
  return searchParams.get(ACCESS_ENV) === 'app';
};
