'use client';

import { ReactNode, useEffect, useState } from 'react';

const DEFERRED_MS = 200;

interface Props {
  fallback?: ReactNode;
  isLoading: boolean;
  children: ReactNode;
}

const DeferredSuspense = ({ fallback, isLoading, children }: Props) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, DEFERRED_MS);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading && !isDeferred) {
    return <div className="h-[100dvh]" />;
  }
  if (isLoading && isDeferred) {
    return fallback ?? <div />;
  }

  return children;
};

export default DeferredSuspense;
