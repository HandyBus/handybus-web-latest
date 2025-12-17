import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface UseIgnoreTrackingProps {
  onIgnore: () => void;
  onClick: () => void;
  threshold?: number;
  timeToConsiderViewed?: number; // millisecond
}

export const useIgnoreTracking = ({
  onIgnore,
  onClick,
  threshold = 0.5,
  timeToConsiderViewed = 1000,
}: UseIgnoreTrackingProps) => {
  const { ref, isInView } = useIntersectionObserver({ threshold });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasViewedRef = useRef(false);
  const hasClickedRef = useRef(false);
  const onIgnoreRef = useRef(onIgnore);

  // 최신 onIgnore 콜백 유지
  useEffect(() => {
    onIgnoreRef.current = onIgnore;
  }, [onIgnore]);

  const handleClick = () => {
    hasClickedRef.current = true;
    onClick();
  };

  useEffect(() => {
    const checkIgnore = () => {
      // "봤는데(1초 이상 머물렀는데)" + "클릭 안 하고" => 무시함(Ignore)
      if (hasViewedRef.current && !hasClickedRef.current) {
        onIgnoreRef.current();
        hasViewedRef.current = false; // 중복 전송 방지
      }
    };

    // 1. 화면에 들어왔을 때
    if (isInView && !hasClickedRef.current && !hasViewedRef.current) {
      timerRef.current = setTimeout(() => {
        hasViewedRef.current = true; // "봤음" 상태로 변경
      }, timeToConsiderViewed);
    }
    // 2. 화면에서 나갔을 때
    else if (!isInView) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      checkIgnore();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // 언마운트 시점에도 체크 (페이지 이동 등)
      checkIgnore();
    };
  }, [isInView, timeToConsiderViewed]);

  return { ref, handleClick };
};
