import { useEffect, useRef, useState } from 'react';

/**
 * useScrollDepth
 * 현재 페이지의 스크롤 깊이를 퍼센트로 추적하는 훅
 *
 * @scrollDepth 현재 스크롤 깊이 (0-100)
 * @maxScrollDepth 최대 스크롤 깊이 (0-100)
 */
export const useScrollDepth = () => {
  const [scrollDepth, setScrollDepth] = useState(0);
  const maxScrollDepthRef = useRef(0);

  useEffect(() => {
    const calculateScrollDepth = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const scrollableHeight = documentHeight - windowHeight;

      if (scrollableHeight <= 0) {
        return 0;
      }

      const currentDepth = Math.round((scrollTop / scrollableHeight) * 100);

      maxScrollDepthRef.current = Math.max(
        maxScrollDepthRef.current,
        currentDepth,
      );

      setScrollDepth(currentDepth);
    };

    const throttledCalculateScrollDepth = throttle(calculateScrollDepth, 100);

    // 초기 계산
    calculateScrollDepth();

    window.addEventListener('scroll', throttledCalculateScrollDepth);
    window.addEventListener('resize', throttledCalculateScrollDepth);

    return () => {
      window.removeEventListener('scroll', throttledCalculateScrollDepth);
      window.removeEventListener('resize', throttledCalculateScrollDepth);
    };
  }, []);

  return {
    currentScrollDepth: scrollDepth,
    maxScrollDepth: maxScrollDepthRef.current,
  };
};

const throttle = (func: () => void, limit: number) => {
  let inThrottle = false;
  return function () {
    if (!inThrottle) {
      func();
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
