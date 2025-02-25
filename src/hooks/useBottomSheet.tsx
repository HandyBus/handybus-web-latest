import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const TRANSFORM_DURATION = { short: '200ms', long: '290ms' };
const LONG_BOTTOM_SHEET_HEIGHT = 500;

interface Metrics {
  transformDuration: string;
  initTouchPosition: number | null;
  initTransformValue: number;
  isContentAreaTouched: boolean;
  closingY: number;
  currHeight: number;
}

interface Props {
  onOpen?: () => void;
  onClose?: () => void;
  preventCloseOnDrag?: boolean;
}

const useBottomSheet = ({
  onOpen,
  onClose,
  preventCloseOnDrag = false,
}: Props = {}) => {
  const bottomSheetRef = useCallback((bottomSheetElement: HTMLDivElement) => {
    if (!bottomSheetElement || !bottomSheetElement?.parentElement) {
      return;
    }
    bottomSheet.current = bottomSheetElement;
    backdrop.current = bottomSheetElement.parentElement;

    if (!preventCloseOnDrag) {
      bottomSheetElement.parentElement.addEventListener(
        'mouseup',
        closeBottomSheet,
      );
      bottomSheetElement.parentElement.addEventListener(
        'touchend',
        closeBottomSheet,
      );
    }
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
    currHeight: 0,
  });

  const [isOpen, setIsOpen] = useState(false);

  // 바텀시트 열고 닫기
  const openBottomSheet = () => {
    // 스크롤 방지
    document.body.style.overflow = 'hidden';

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
    metrics.current.currHeight = bottomSheetHeight;

    requestAnimationFrame(() => {
      bottomSheetElement.style.transitionDuration =
        metrics.current.transformDuration;
      bottomSheetElement.style.transform = `translateY(0px)`;
      setIsOpen(true);
      onOpen?.();
    });
  };

  const closeBottomSheet = () => {
    // 스크롤 방지 해제
    document.body.style.overflow = 'unset';

    const bottomSheetElement = bottomSheet.current;
    const backdropElement = backdrop.current;
    if (!bottomSheetElement || !backdropElement) {
      return;
    }
    const bottomSheetHeight = bottomSheetElement.clientHeight;

    requestAnimationFrame(() => {
      bottomSheetElement.style.transitionDuration =
        metrics.current.transformDuration;
      bottomSheetElement.style.transform = `translateY(${bottomSheetHeight}px)`;
    });

    setTimeout(() => {
      bottomSheetElement.style.display = 'none';
      backdropElement.style.display = 'none';
      setIsOpen(false);
      onClose?.();
    }, 150);
  };

  // 바텀시트 크기 변경 감지
  useEffect(() => {
    const bottomSheetElement = bottomSheet.current;
    if (!bottomSheetElement || !isOpen) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const currHeight = metrics.current.currHeight;
      const newHeight = bottomSheetElement.clientHeight;

      metrics.current.closingY = newHeight / 2;
      metrics.current.currHeight = newHeight;

      if (newHeight > LONG_BOTTOM_SHEET_HEIGHT) {
        metrics.current.transformDuration = TRANSFORM_DURATION.long;
      } else {
        metrics.current.transformDuration = TRANSFORM_DURATION.short;
      }

      bottomSheetElement.style.transitionDuration = '0ms';
      bottomSheetElement.style.transform = `translateY(${newHeight - currHeight}px)`;

      requestAnimationFrame(() => {
        bottomSheetElement.style.transitionDuration =
          metrics.current.transformDuration;
        bottomSheetElement.style.transform = `translateY(0px)`;
      });
    });

    observer.observe(bottomSheetElement);

    return () => {
      observer.disconnect();
    };
  }, [isOpen]);

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

    if (finalTransformValue < closingY || preventCloseOnDrag) {
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

  return {
    bottomSheetRef,
    contentRef,
    openBottomSheet,
    closeBottomSheet,
    isOpen,
  };
};

export default useBottomSheet;

export interface BottomSheetRefs {
  bottomSheetRef: (
    bottomSheetElement: HTMLDivElement,
  ) => (() => void) | undefined;
  contentRef: RefObject<HTMLDivElement>;
}
