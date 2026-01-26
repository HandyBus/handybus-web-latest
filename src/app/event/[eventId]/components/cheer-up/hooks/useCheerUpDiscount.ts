import { useMemo } from 'react';
import { DISCOUNT_GOALS } from '../cheer-up.const';

interface NextGoal {
  participants: number;
  discountRate: number;
  remainingParticipants: number;
  progressPercentage: number;
  progressStart: number;
  progressEnd: number;
}

export const useCheerUpDiscount = (displayParticipants: number) => {
  // 현재 달성된 할인율 계산
  const currentDiscountRate = useMemo(() => {
    for (let i = DISCOUNT_GOALS.length - 1; i >= 0; i--) {
      if (displayParticipants >= DISCOUNT_GOALS[i].participants) {
        return DISCOUNT_GOALS[i].discountRate;
      }
    }
    return 0;
  }, [displayParticipants]);

  // 다음 목표 정보 계산
  const nextGoal = useMemo<NextGoal | null>(() => {
    const nextGoalItem = DISCOUNT_GOALS.find(
      (goal) => goal.discountRate > currentDiscountRate,
    );

    if (!nextGoalItem) {
      return null; // 모든 목표 달성
    }

    const remainingParticipants =
      nextGoalItem.participants - displayParticipants;
    const currentGoalIndex = DISCOUNT_GOALS.findIndex(
      (goal) => goal.discountRate === currentDiscountRate,
    );

    // 현재 목표 대비 진행률 계산
    const progressStart =
      currentGoalIndex > 0
        ? DISCOUNT_GOALS[currentGoalIndex - 1].participants
        : 0;
    const progressEnd = nextGoalItem.participants;
    const progressRange = progressEnd - progressStart;
    const currentProgress = displayParticipants - progressStart;
    const progressPercentage = Math.min(
      Math.max((currentProgress / progressRange) * 100, 0),
      100,
    );

    return {
      ...nextGoalItem,
      remainingParticipants,
      progressPercentage,
      progressStart,
      progressEnd,
    };
  }, [displayParticipants, currentDiscountRate]);

  // 현재 진행률 계산
  const currentProgress = useMemo(() => {
    if (!nextGoal) {
      return 100;
    }
    const currentGoalIndex = DISCOUNT_GOALS.findIndex(
      (goal) => goal.discountRate === currentDiscountRate,
    );
    const progressStart =
      currentGoalIndex > 0
        ? DISCOUNT_GOALS[currentGoalIndex - 1].participants
        : 0;
    const progressEnd = nextGoal.participants;
    const progressRange = progressEnd - progressStart;
    const progress = displayParticipants - progressStart;
    return Math.min(Math.max((progress / progressRange) * 100, 0), 100);
  }, [displayParticipants, nextGoal, currentDiscountRate]);

  return {
    currentDiscountRate,
    nextGoal,
    currentProgress,
  };
};
