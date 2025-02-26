'use client';

import { getIsLoggedIn } from '@/utils/handleToken.util';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

const useAuthRouter = () => {
  const router = useRouter();

  const push = (href: string, options?: NavigateOptions) => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      const loginPath = createLoginRedirectPath(href);
      router.push(loginPath, options);
    } else {
      router.push(href, options);
    }
  };

  const replace = (href: string, options?: NavigateOptions) => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      const loginPath = createLoginRedirectPath(href);
      router.replace(loginPath, options);
    } else {
      router.replace(href, options);
    }
  };

  return { push, replace };
};

export default useAuthRouter;

export const createLoginRedirectPath = (href: string) => {
  return `/login?redirectUrl=${href}`;
};
