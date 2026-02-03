import { useEffect, useState, useRef } from 'react';

// 참여 수 애니메이션 훅
export const useCheerParticipationAnimation = (
  currentParticipations: number,
) => {
  const [displayParticipations, setDisplayParticipations] = useState(
    currentParticipations,
  );
  const [showCheerMessage, setShowCheerMessage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevParticipationsRef = useRef(currentParticipations);

  // 참여 수가 변경될 때 애니메이션
  useEffect(() => {
    const prevParticipations = prevParticipationsRef.current;

    if (currentParticipations > prevParticipations) {
      setIsAnimating(true);
      setShowCheerMessage(true);
      const startValue = prevParticipations;
      const diff = currentParticipations - startValue;
      const duration = 1200;
      const steps = 40;
      const stepDuration = duration / steps;
      const increment = diff / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(
          startValue + increment * currentStep,
          currentParticipations,
        );
        setDisplayParticipations(Math.floor(newValue));

        if (currentStep >= steps) {
          setDisplayParticipations(currentParticipations);
          clearInterval(timer);
          setIsAnimating(false);
        }
      }, stepDuration);

      // 메시지 숨기기
      const messageTimer = setTimeout(() => {
        setShowCheerMessage(false);
      }, 2500);

      prevParticipationsRef.current = currentParticipations;

      return () => {
        clearInterval(timer);
        clearTimeout(messageTimer);
      };
    } else if (currentParticipations !== prevParticipations) {
      // 참여 수가 감소한 경우 또는 동일한 경우 (초기화 등)
      setDisplayParticipations(currentParticipations);
      prevParticipationsRef.current = currentParticipations;
    }
  }, [currentParticipations]);

  return {
    displayParticipations,
    showCheerMessage,
    isAnimating,
  };
};

// 진행률 애니메이션 훅
interface UseCheerProgressAnimationProps {
  currentProgress: number;
  isAnimating: boolean;
}

export const useCheerProgressAnimation = ({
  currentProgress,
  isAnimating,
}: UseCheerProgressAnimationProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(currentProgress);
  const prevProgressRef = useRef(currentProgress);

  // 진행률 애니메이션 - 현재 위치에서 증가한 부분만
  useEffect(() => {
    const prevProgress = prevProgressRef.current;
    const progressDiff = currentProgress - prevProgress;

    // 진행률이 증가한 경우에만 애니메이션
    if (progressDiff > 0 && isAnimating) {
      const duration = 1200;
      const steps = 40;
      const stepDuration = duration / steps;
      const increment = progressDiff / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(
          prevProgress + increment * currentStep,
          currentProgress,
        );
        setAnimatedProgress(newValue);

        if (currentStep >= steps) {
          setAnimatedProgress(currentProgress);
          prevProgressRef.current = currentProgress;
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    } else {
      // 진행률이 변경되지 않았거나 감소한 경우 즉시 업데이트
      setAnimatedProgress(currentProgress);
      prevProgressRef.current = currentProgress;
    }
  }, [currentProgress, isAnimating]);

  return {
    animatedProgress,
  };
};
