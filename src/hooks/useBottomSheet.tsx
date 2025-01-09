import { MutableRefObject, useCallback, useRef } from 'react';

interface Metrics {
  transformDuration: string;
  initTouchPosition: number | null;
  initTransformValue: number;
  isContentAreaTouched: boolean;
  closingY: number;
}

const TRANSFORM_DURATION = { short: '200ms', long: '290ms' };
const LONG_BOTTOM_SHEET_HEIGHT = 500;

const useBottomSheet = () => {
  const bottomSheetRef = useCallback((bottomSheetElement: HTMLDivElement) => {
    if (!bottomSheetElement || !bottomSheetElement?.parentElement) {
      return;
    }
    bottomSheet.current = bottomSheetElement;
    backdrop.current = bottomSheetElement.parentElement;

    bottomSheetElement.parentElement.addEventListener(
      'mouseup',
      closeBottomSheet,
    );
    bottomSheetElement.parentElement.addEventListener(
      'touchend',
      closeBottomSheet,
    );
    bottomSheetElement.addEventListener('mouseup', (e) => e.stopPropagation());
    bottomSheetElement.addEventListener('touchend', (e) => e.stopPropagation());

    bottomSheetElement.addEventListener('touchstart', handleTouch.start);
    bottomSheetElement.addEventListener('touchmove', handleTouch.move);
    bottomSheetElement.addEventListener('touchend', handleTouch.end);

    bottomSheetElement.addEventListener('mousedown', handleMouse.down);
    bottomSheetElement.addEventListener('mousemove', handleMouse.move);
    bottomSheetElement.addEventListener('mouseup', handleMouse.up);
    bottomSheetElement.addEventListener('mouseleave', handleMouse.leave);

    contentRef.current?.addEventListener('touchstart', handleContentTouch);
    contentRef.current?.addEventListener('mousedown', handleContentTouch);

    return () => {
      bottomSheetElement.parentElement?.removeEventListener(
        'mouseup',
        closeBottomSheet,
      );
      bottomSheetElement.parentElement?.removeEventListener(
        'touchend',
        closeBottomSheet,
      );
      bottomSheetElement.removeEventListener('mouseup', (e) =>
        e.stopPropagation(),
      );
      bottomSheetElement.removeEventListener('touchend', (e) =>
        e.stopPropagation(),
      );

      bottomSheetElement.removeEventListener('touchstart', handleTouch.start);
      bottomSheetElement.removeEventListener('touchmove', handleTouch.move);
      bottomSheetElement.removeEventListener('touchend', handleTouch.end);

      bottomSheetElement.removeEventListener('mousedown', handleMouse.down);
      bottomSheetElement.removeEventListener('mousemove', handleMouse.move);
      bottomSheetElement.removeEventListener('mouseup', handleMouse.up);
      bottomSheetElement.removeEventListener('mouseleave', handleMouse.leave);

      contentRef.current?.removeEventListener('touchstart', handleContentTouch);
      contentRef.current?.removeEventListener('mousedown', handleContentTouch);
    };
  }, []);

  const bottomSheet: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const backdrop: MutableRefObject<HTMLElement | null> = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metrics = useRef<Metrics>({
    transformDuration: TRANSFORM_DURATION.short,
    initTouchPosition: null,
    initTransformValue: 0,
    isContentAreaTouched: false,
    closingY: 0,
  });

  // 바텀시트 열고 닫기
  const openBottomSheet = () => {
    const bottomSheetElement = bottomSheet.current;
    const backdropElement = backdrop.current;
    if (!bottomSheetElement || !backdropElement) {
      return;
    }
    bottomSheetElement.style.transitionDuration = '0ms';
    bottomSheetElement.style.display = 'flex';
    backdropElement.style.display = 'flex';

    const bottomSheetHeight = bottomSheetElement.clientHeight;
    if (bottomSheetHeight > LONG_BOTTOM_SHEET_HEIGHT) {
      metrics.current.transformDuration = TRANSFORM_DURATION.long;
    } else {
      metrics.current.transformDuration = TRANSFORM_DURATION.short;
    }

    bottomSheetElement.style.transform = `translateY(${bottomSheetHeight}px)`;
    metrics.current.closingY = bottomSheetHeight / 2;

    setTimeout(() => {
      bottomSheetElement.style.transitionDuration =
        metrics.current.transformDuration;
      bottomSheetElement.style.transform = `translateY(0px)`;
    }, 0);
  };

  const closeBottomSheet = () => {
    const bottomSheetElement = bottomSheet.current;
    const backdropElement = backdrop.current;
    if (!bottomSheetElement || !backdropElement) {
      return;
    }
    const bottomSheetHeight = bottomSheetElement.clientHeight;
    bottomSheetElement.style.transitionDuration =
      metrics.current.transformDuration;
    bottomSheetElement.style.transform = `translateY(${bottomSheetHeight}px)`;

    setTimeout(() => {
      bottomSheetElement.style.display = 'none';
      backdropElement.style.display = 'none';
    }, 130);
  };

  // 바텀시트 드래그
  const handleStart = (clientY: number) => {
    const bottomSheetElement = bottomSheet.current;
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
    const bottomSheetElement = bottomSheet.current;
    const { initTouchPosition, initTransformValue, isContentAreaTouched } =
      metrics.current;
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
    const bottomSheetElement = bottomSheet.current;
    const { initTouchPosition, closingY } = metrics.current;
    if (!initTouchPosition || !bottomSheetElement) {
      return;
    }

    const finalTransformValue = Number(
      bottomSheetElement.style.transform
        .replace('translateY(', '')
        .replace('px)', '') || 0,
    );
    bottomSheetElement.style.transitionDuration =
      metrics.current.transformDuration;

    if (finalTransformValue < closingY) {
      bottomSheetElement.style.transform = `translateY(0px)`;
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

  return { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet };
};

export default useBottomSheet;
