'use client';

import { useEffect, useState, RefObject, useCallback } from 'react';

interface Props {
  containerRef: RefObject<HTMLElement>;
  threshold?: number;
  isActive?: boolean;
}

const useScrollToBottom = ({
  containerRef,
  threshold = 50,
  isActive = true,
}: Props) => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const checkScrollPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;
    setIsScrolledToBottom(isAtBottom);
  }, [containerRef, threshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isActive) {
      return;
    }

    checkScrollPosition();

    const handleScroll = () => {
      requestAnimationFrame(checkScrollPosition);
    };

    const handleResize = () => {
      requestAnimationFrame(checkScrollPosition);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(checkScrollPosition);
    });
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [containerRef, checkScrollPosition, isActive]);

  return isScrolledToBottom;
};

export default useScrollToBottom;
