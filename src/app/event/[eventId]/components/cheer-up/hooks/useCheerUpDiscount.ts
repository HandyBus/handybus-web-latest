import { useMemo } from 'react';
import { EventCheerCampaignsViewEntity } from '@/types/cheer.type';

interface NextGoal {
  participants: number;
  discountRate: number;
  remainingParticipants: number;
  progressPercentage: number;
  progressStart: number;
  progressEnd: number;
}

export const useCheerUpDiscount = (
  displayParticipants: number,
  cheerCampaign?: EventCheerCampaignsViewEntity,
) => {
  // API의 discountPolicies를 정렬하여 사용
  const discountGoals = useMemo(() => {
    if (!cheerCampaign?.discountPolicies) return [];
    return [...cheerCampaign.discountPolicies]
      .filter((policy) => policy.isActive)
      .sort((a, b) => a.minParticipationCount - b.minParticipationCount)
      .map((policy) => ({
        participants: policy.minParticipationCount,
        discountRate: policy.discountRate,
      }));
  }, [cheerCampaign?.discountPolicies]);

  // 현재 달성된 할인율 계산
  const currentDiscountRate = useMemo(() => {
    // result가 있으면 최종 할인율 사용
    if (cheerCampaign?.result) {
      return cheerCampaign.result.finalDiscountRate;
    }

    for (let i = discountGoals.length - 1; i >= 0; i--) {
      if (displayParticipants >= discountGoals[i].participants) {
        return discountGoals[i].discountRate;
      }
    }
    return 0;
  }, [displayParticipants, discountGoals, cheerCampaign?.result]);

  // 다음 목표 정보 계산
  const nextGoal = useMemo<NextGoal | null>(() => {
    if (discountGoals.length === 0) return null;

    const nextGoalItem = discountGoals.find(
      (goal) => goal.discountRate > currentDiscountRate,
    );

    if (!nextGoalItem) {
      return null; // 모든 목표 달성
    }

    const remainingParticipants =
      nextGoalItem.participants - displayParticipants;
    const currentGoalIndex = discountGoals.findIndex(
      (goal) => goal.discountRate === currentDiscountRate,
    );

    // 현재 목표 대비 진행률 계산
    const progressStart =
      currentGoalIndex > 0
        ? discountGoals[currentGoalIndex - 1].participants
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
  }, [displayParticipants, currentDiscountRate, discountGoals]);

  // 현재 진행률 계산
  const currentProgress = useMemo(() => {
    if (!nextGoal || discountGoals.length === 0) {
      return 100;
    }
    const currentGoalIndex = discountGoals.findIndex(
      (goal) => goal.discountRate === currentDiscountRate,
    );
    const progressStart =
      currentGoalIndex > 0
        ? discountGoals[currentGoalIndex - 1].participants
        : 0;
    const progressEnd = nextGoal.participants;
    const progressRange = progressEnd - progressStart;
    const progress = displayParticipants - progressStart;
    return Math.min(Math.max((progress / progressRange) * 100, 0), 100);
  }, [displayParticipants, nextGoal, currentDiscountRate, discountGoals]);

  return {
    currentDiscountRate,
    nextGoal,
    currentProgress,
  };
};
