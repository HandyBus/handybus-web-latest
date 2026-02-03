'use client';

import { useAtom } from 'jotai';
import { cheerParticipationAtom } from '../../store/cheerParticipationAtom';
import { useCheerDiscount } from './hooks/useCheerDiscount';
import {
  useCheerParticipationAnimation,
  useCheerProgressAnimation,
} from './hooks/useCheerAnimation';
import { useGetEventCheerCampaignByEventId } from '@/services/cheer.service';
import { useEffect } from 'react';

interface Props {
  eventId: string;
}

const CheerDiscountInfo = ({ eventId }: Props) => {
  const { data: cheerCampaign, isLoading } =
    useGetEventCheerCampaignByEventId(eventId);
  const [currentParticipations, setCurrentParticipations] = useAtom(
    cheerParticipationAtom,
  );

  useEffect(() => {
    if (cheerCampaign?.cheerChampaignParticipationTotalCount !== undefined) {
      setCurrentParticipations(
        cheerCampaign.cheerChampaignParticipationTotalCount,
      );
    }
  }, [
    cheerCampaign?.cheerChampaignParticipationTotalCount,
    setCurrentParticipations,
  ]);

  // 먼저 애니메이션으로 표시되는 참여 수를 가져옴
  const { displayParticipations, showCheerMessage, isAnimating } =
    useCheerParticipationAnimation(currentParticipations);

  // displayParticipants를 기준으로 할인율과 진행률 계산
  const { currentDiscountRate, nextGoal, currentProgress } = useCheerDiscount(
    displayParticipations,
    cheerCampaign,
  );

  // 진행률 애니메이션
  const { animatedProgress } = useCheerProgressAnimation({
    currentProgress,
    isAnimating,
  });

  if (isLoading || !cheerCampaign) {
    return null;
  }

  return (
    <section className="flex flex-col gap-16 px-16 pb-24">
      {/* 할인율 및 목표 정보 */}
      <div className="flex flex-col gap-16">
        {/* 할인율 카드 */}
        <div className="flex flex-col gap-12 rounded-12 border border-basic-grey-100 bg-basic-white p-16">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <div className="text-14 font-500 text-basic-grey-600">
                현재 달성 할인율
              </div>
              <div className="flex items-baseline gap-4">
                <span
                  className={`text-32 font-700 transition-all duration-500 ${
                    isAnimating
                      ? 'scale-110 text-brand-primary-400'
                      : 'text-basic-grey-900'
                  }`}
                >
                  {currentDiscountRate}%
                </span>
                <span className="text-16 font-500 text-basic-grey-500">
                  할인
                </span>
              </div>
            </div>
            {nextGoal && (
              <div className="flex flex-col items-end gap-4">
                <div className="text-12 font-500 text-basic-grey-600">
                  다음 목표
                </div>
                <div className="text-18 font-700 text-brand-primary-400">
                  {nextGoal.discountRate}%
                </div>
              </div>
            )}
          </div>

          {/* 진행률 바 */}
          {nextGoal && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <span className="text-12 font-500 text-basic-grey-600">
                  {animatedProgress.toFixed(0)}% 진행
                </span>
                <span className="text-12 font-500 text-basic-grey-400">
                  {nextGoal.remainingParticipants.toLocaleString()}명 남음
                </span>
              </div>
              <div className="relative h-[24px] w-full overflow-hidden rounded-[40px] bg-basic-grey-100">
                <div
                  className="h-full rounded-[40px] transition-all ease-out"
                  style={{
                    width: `${animatedProgress}%`,
                    transitionDuration: isAnimating ? '1200ms' : '300ms',
                    background: isAnimating
                      ? 'linear-gradient(90deg, rgb(128 255 223) 0%, rgb(0 224 168) 50%, rgb(0 200 150) 100%)'
                      : 'linear-gradient(90deg, rgb(128 255 223) 0%, rgb(0 224 168) 100%)',
                    boxShadow: isAnimating
                      ? '0 0 20px rgba(0, 224, 168, 0.6), 0 0 40px rgba(0, 224, 168, 0.4)'
                      : 'none',
                    transform: isAnimating ? 'scaleY(1.1)' : 'scaleY(1)',
                    transformOrigin: 'left center',
                  }}
                >
                  {/* 파도 효과 */}
                  {isAnimating && (
                    <div
                      className="absolute inset-0 animate-wave opacity-40"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                      }}
                    />
                  )}
                </div>
                {/* 목표 지점 마커 */}
                <div
                  className="absolute top-0 h-full w-[2px] bg-brand-primary-400 opacity-50"
                  style={{ left: '100%' }}
                />
              </div>
              <div className="flex items-center justify-between text-10 font-500 text-basic-grey-400">
                <span>{nextGoal.progressStart.toLocaleString()}명</span>
                <span>{nextGoal.progressEnd.toLocaleString()}명</span>
              </div>
            </div>
          )}

          {/* 모든 목표 달성 시 */}
          {!nextGoal && (
            <div className="flex items-center justify-center rounded-8 bg-brand-primary-50 py-12">
              <span className="text-14 font-600 text-brand-primary-400">
                🎉 최대 할인율 달성!
              </span>
            </div>
          )}
        </div>

        {/* 참여 수 정보 */}
        <div className="relative text-center text-14 font-500 text-basic-grey-600">
          현재{' '}
          <span
            className={`inline-block transition-all duration-500 ${
              isAnimating
                ? 'scale-125 font-700 text-brand-primary-400'
                : 'text-basic-grey-600'
            }`}
          >
            {displayParticipations.toLocaleString()}
          </span>
          명이 응원 중이에요
          {/* +1 응원 적립 메시지 */}
          {showCheerMessage && (
            <div className="absolute left-1/2 top-[-50px] -translate-x-1/2 animate-bounce rounded-full bg-brand-primary-400 px-12 text-14 font-700 text-basic-white shadow-lg">
              <span className="inline-block animate-pulse">✨</span>{' '}
              <span>+1 응원 적립!</span>{' '}
              <span className="inline-block animate-pulse">✨</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CheerDiscountInfo;
