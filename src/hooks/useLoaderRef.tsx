import { useEffect, useRef } from 'react';

import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

/**
 * trigger fetchNextPage when the ref is intersecting.
 *
 * @param fetchNextPage comes from result of useInfiniteQuery
 * @returns ref which is HTMLDivElement
 */
export const useLoaderRef = <TData, TError>(
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<TData, TError>>,
) => {
  const ref = useRef<HTMLDivElement>(null);

  const useObserver = ({
    target,
    rootMargin = '0px',
    threshold = 1.0,
    onIntersect,
  }: {
    target: React.RefObject<HTMLElement>;
    rootMargin?: string;
    threshold?: number;
    onIntersect: IntersectionObserverCallback;
  }) => {
    useEffect(() => {
      let observer: IntersectionObserver | undefined;

      if (target && target.current) {
        observer = new IntersectionObserver(onIntersect, {
          root: null,
          rootMargin,
          threshold,
        });

        observer.observe(target.current);
      }
      return () => observer && observer.disconnect();
    }, [target, rootMargin, threshold, onIntersect]);
  };

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && fetchNextPage();

  useObserver({
    target: ref,
    onIntersect,
  });

  return ref;
};
