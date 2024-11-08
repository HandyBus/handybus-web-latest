import { useEffect, useRef } from 'react';

interface Metrics {
  initTouchPosition: number | null;
  initTransformValue: number;
  isContentAreaTouched: boolean;
  closingY: number;
}

const TRANSFORM_DURATION = '200ms';

const useBottomSheet = () => {
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metrics = useRef<Metrics>({
    initTouchPosition: null,
    initTransformValue: 0,
    isContentAreaTouched: false,
    closingY: 0,
  });

  // 바텀시트 열고 닫기
  const openBottomSheet = () => {
    const bottomSheetElement = bottomSheetRef.current;
    const backdropElement = bottomSheetRef.current?.parentElement;
    if (!bottomSheetElement || !backdropElement) {
      return;
    }
    bottomSheetElement.style.transitionDuration = '0ms';
    bottomSheetElement.style.display = 'flex';
    backdropElement.style.display = 'flex';

    const bottomSheetHeight = bottomSheetRef.current.clientHeight;
    bottomSheetElement.style.transform = `translateY(${bottomSheetHeight}px)`;
    metrics.current.closingY = bottomSheetHeight / 2;

    setTimeout(() => {
      bottomSheetElement.style.transitionDuration = TRANSFORM_DURATION;
      bottomSheetElement.style.transform = `translateY(0px)`;
    }, 10);
  };

  const closeBottomSheet = () => {
    const bottomSheetElement = bottomSheetRef.current;
    const backdropElement = bottomSheetRef.current?.parentElement;
    if (!bottomSheetElement || !backdropElement) {
      return;
    }
    const bottomSheetHeight = bottomSheetRef.current.clientHeight;
    bottomSheetElement.style.transitionDuration = TRANSFORM_DURATION;
    bottomSheetElement.style.transform = `translateY(${bottomSheetHeight}px)`;

    setTimeout(() => {
      bottomSheetElement.style.display = 'none';
      backdropElement.style.display = 'none';
    }, 150);
  };

  useEffect(() => {
    const backdropElement = bottomSheetRef.current?.parentElement;
    const bottomSheetElement = bottomSheetRef.current;
    if (!bottomSheetElement || !backdropElement) {
      return;
    }
    backdropElement.addEventListener('click', closeBottomSheet);
    bottomSheetElement.addEventListener('click', (e) => e.stopPropagation());
    return () => {
      backdropElement.removeEventListener('click', closeBottomSheet);
      bottomSheetElement.removeEventListener('click', (e) =>
        e.stopPropagation(),
      );
    };
  }, []);

  // 바텀시트 드래그
  const handleStart = (clientY: number) => {
    const bottomSheetElement = bottomSheetRef.current;
    if (!bottomSheetElement) {
      return;
    }
    bottomSheetElement.style.transitionDuration = '0ms';

    const initTransformValue = Number(
      bottomSheetElement.style.transform
        .replace('translateY(', '')
        .replace('px)', '') || 0,
    );
    metrics.current.initTransformValue = initTransformValue;
    metrics.current.initTouchPosition = clientY;
  };

  const handleMove = (clientY: number, e: Event) => {
    const { initTouchPosition, initTransformValue, isContentAreaTouched } =
      metrics.current;
    const bottomSheetElement = bottomSheetRef.current;
    if (!initTouchPosition || !bottomSheetElement || isContentAreaTouched) {
      return;
    }
    e.preventDefault();

    const currTouchPosition = clientY;
    let diff =
      (initTouchPosition - currTouchPosition) * -1 + initTransformValue;
    if (diff < 0) {
      diff = Math.floor(diff / 10);
    }
    bottomSheetElement.style.transform = `translateY(${diff}px)`;
  };

  const handleEnd = () => {
    const { initTouchPosition, closingY } = metrics.current;
    const bottomSheetElement = bottomSheetRef.current;
    if (!initTouchPosition || !bottomSheetElement) {
      return;
    }

    const finalTransformValue = Number(
      bottomSheetElement.style.transform
        .replace('translateY(', '')
        .replace('px)', '') || 0,
    );
    bottomSheetElement.style.transitionDuration = TRANSFORM_DURATION;

    if (finalTransformValue < closingY) {
      bottomSheetRef.current.style.transform = `translateY(0px)`;
    } else {
      closeBottomSheet();
    }

    metrics.current.isContentAreaTouched = false;
    metrics.current.initTouchPosition = null;
  };

  const handleContentTouch = () => {
    metrics.current.isContentAreaTouched = true;
  };

  const handleTouch = {
    start: (e: TouchEvent) => handleStart(e.touches[0].clientY),
    move: (e: TouchEvent) => handleMove(e.touches[0].clientY, e),
    end: handleEnd,
  };

  const handleMouse = {
    down: (e: MouseEvent) => handleStart(e.clientY),
    move: (e: MouseEvent) => handleMove(e.clientY, e),
    up: handleEnd,
    leave: handleEnd,
  };

  useEffect(() => {
    const bottomSheetElement = bottomSheetRef.current;
    const contentElement = contentRef.current;
    bottomSheetElement?.addEventListener('touchstart', handleTouch.start);
    bottomSheetElement?.addEventListener('touchmove', handleTouch.move);
    bottomSheetElement?.addEventListener('touchend', handleTouch.end);

    bottomSheetElement?.addEventListener('mousedown', handleMouse.down);
    bottomSheetElement?.addEventListener('mousemove', handleMouse.move);
    bottomSheetElement?.addEventListener('mouseup', handleMouse.up);
    bottomSheetElement?.addEventListener('mouseleave', handleMouse.leave);

    contentElement?.addEventListener('touchstart', handleContentTouch);
    contentElement?.addEventListener('mousedown', handleContentTouch);

    return () => {
      bottomSheetElement?.removeEventListener('touchstart', handleTouch.start);
      bottomSheetElement?.removeEventListener('touchmove', handleTouch.move);
      bottomSheetElement?.removeEventListener('touchend', handleTouch.end);

      bottomSheetElement?.removeEventListener('mousedown', handleMouse.down);
      bottomSheetElement?.removeEventListener('mousemove', handleMouse.move);
      bottomSheetElement?.removeEventListener('mouseup', handleMouse.up);
      bottomSheetElement?.removeEventListener('mouseleave', handleMouse.leave);

      contentElement?.removeEventListener('touchstart', handleContentTouch);
      contentElement?.removeEventListener('mousedown', handleContentTouch);
    };
  }, []);

  return { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet };
};

export default useBottomSheet;
