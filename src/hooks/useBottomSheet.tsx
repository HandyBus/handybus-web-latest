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

// 바텀시트 하단 패딩 값 (애니메이션은 내려가는 속도를 제어하기 위해 650px로 설정)
const BOTTOM_SHEET_BOTTOM_PADDING_OFFSET = 800;
const BOTTOM_SHEET_BOTTOM_PADDING_OFFSET_FOR_ANIMATION = 650;

// 화면 크기에 따라 translateX 값을 반환하는 함수
const getTranslateX = () => {
  if (window.innerWidth >= 1280) {
    return 'translateX(0)';
  }
  return 'translateX(-50%)';
};

// transform 문자열에서 translateY 값을 추출하는 함수
const getTranslateYValue = (transformString: string): number => {
  const match = transformString.match(/translateY\((-?\d+(?:\.\d+)?)px\)/);
  return match ? Number(match[1]) : 0;
};

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

    bottomSheetElement.style.transform = `${getTranslateX()} translateY(${bottomSheetHeight}px)`;
    metrics.current.closingY =
      (bottomSheetHeight - BOTTOM_SHEET_BOTTOM_PADDING_OFFSET) / 2;
    metrics.current.currHeight = bottomSheetHeight;

    requestAnimationFrame(() => {
      bottomSheetElement.style.transitionDuration =
        metrics.current.transformDuration;
      bottomSheetElement.style.transform = `${getTranslateX()} translateY(0px)`;
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
      bottomSheetElement.style.transform = `${getTranslateX()} translateY(${bottomSheetHeight - BOTTOM_SHEET_BOTTOM_PADDING_OFFSET_FOR_ANIMATION}px)`;
    });

    setTimeout(() => {
      bottomSheetElement.style.display = 'none';
      backdropElement.style.display = 'none';
      setIsOpen(false);
      onClose?.();
    }, 150);
  };

  // 창 크기 변경 감지 (반응형 대응)
  useEffect(() => {
    const bottomSheetElement = bottomSheet.current;
    if (!bottomSheetElement || !isOpen) {
      return;
    }

    const handleResize = () => {
      const currentTranslateY = getTranslateYValue(
        bottomSheetElement.style.transform,
      );
      // 좌우 이동 시에만 transition 비활성화, 바텀시트가 열리는 애니메이션엔 영향을 주지 않음.
      bottomSheetElement.style.transitionDuration = '0ms';
      bottomSheetElement.style.transform = `${getTranslateX()} translateY(${currentTranslateY}px)`;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // 바텀시트 크기 변경 감지
  useEffect(() => {
    const bottomSheetElement = bottomSheet.current;
    if (!bottomSheetElement || !isOpen) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const currHeight = metrics.current.currHeight;
      const newHeight = bottomSheetElement.clientHeight;

      metrics.current.closingY =
        (newHeight - BOTTOM_SHEET_BOTTOM_PADDING_OFFSET) / 2;
      metrics.current.currHeight = newHeight;

      if (newHeight > LONG_BOTTOM_SHEET_HEIGHT) {
        metrics.current.transformDuration = TRANSFORM_DURATION.long;
      } else {
        metrics.current.transformDuration = TRANSFORM_DURATION.short;
      }

      bottomSheetElement.style.transitionDuration = '0ms';
      bottomSheetElement.style.transform = `${getTranslateX()} translateY(${newHeight - currHeight}px)`;

      requestAnimationFrame(() => {
        bottomSheetElement.style.transitionDuration =
          metrics.current.transformDuration;
        bottomSheetElement.style.transform = `${getTranslateX()} translateY(0px)`;
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

    const initTransformValue = getTranslateYValue(
      bottomSheetElement.style.transform,
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
    bottomSheetElement.style.transform = `${getTranslateX()} translateY(${diff}px)`;
  };

  const handleEnd = () => {
    const bottomSheetElement = bottomSheet.current;
    const { initTouchPosition, closingY } = metrics.current;
    if (!initTouchPosition || !bottomSheetElement) {
      return;
    }

    const finalTransformValue = getTranslateYValue(
      bottomSheetElement.style.transform,
    );
    bottomSheetElement.style.transitionDuration =
      metrics.current.transformDuration;

    if (finalTransformValue < closingY || preventCloseOnDrag) {
      bottomSheetElement.style.transform = `${getTranslateX()} translateY(0px)`;
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
  contentRef?: RefObject<HTMLDivElement>;
}
