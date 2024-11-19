'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

import type { MutableRefObject } from 'react';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Auto hide element when scrolling down, and show when scrolling up.
 *
 * @returns {Object} ref, safeCN, show
 * @returns {MutableRefObject<HTMLDivElement | undefined>} ref - ref callback, should be passed to the whole bar element. it must be `sticky` with proper `top` value, which is same with the initial top value of the bar.
 * @returns {string} safeCN - class name for safe area
 * @returns {Function} show - show element
 *
 * @example
 * const { ref, safeArea, show } = useStickyMenu();
    <div ref={ref} className="sticky top-24 z-[1] w-full">
      ...
      <div className={safeArea}>
        ...
      </div>
    </div>
 *
 */
const useStickyMenu = () => {
  const safeArea = 'SAFE';

  const elemRef: MutableRefObject<HTMLDivElement | undefined> =
    useRef(undefined);
  const [observe, setObserve] = useState(false);
  const totalHeight = useRef<number | undefined>(undefined);
  const safeHeight = useRef<number | undefined>(undefined);
  const offset = useRef<number>(0);

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      elemRef.current = node;
      totalHeight.current = node.clientHeight;
      safeHeight.current =
        node.querySelector(`.${safeArea}`)?.clientHeight || 0;
      setObserve(true);
    }
  }, []);

  const show = useCallback(() => {
    offset.current = 0;
    if (elemRef.current) elemRef.current.style.transform = 'translateY(0)';
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((elems) => {
      for (const elem of elems) {
        if (elem.target === elemRef.current) {
          totalHeight.current = elemRef.current.clientHeight;
          safeHeight.current =
            elemRef.current.querySelector(`.${safeArea}`)?.clientHeight || 0;
        }
      }
    });

    if (elemRef.current) {
      resizeObserver.observe(elemRef.current);
    }

    return () => {
      if (elemRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, [observe]);

  useEffect(() => {
    // NOTE prevent bounce scroll error
    let prevScrollpos = clamp(
      window.scrollY,
      0,
      document.body.scrollHeight - window.innerHeight,
    );

    const handleScroll = function () {
      if (
        !elemRef.current ||
        totalHeight.current === undefined ||
        safeHeight.current === undefined
      )
        return;

      const currentScrollPos = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      );
      const scrollDiff = prevScrollpos - currentScrollPos;
      offset.current = clamp(
        offset.current + scrollDiff,
        -totalHeight.current + safeHeight.current,
        0,
      );

      elemRef.current.style.transform = `translateY(${offset.current}px)`;
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [elemRef]);

  return { ref: refCallback, safeArea, show };
};

export default useStickyMenu;
