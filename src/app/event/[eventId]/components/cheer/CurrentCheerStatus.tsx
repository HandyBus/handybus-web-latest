import { EventCheerCampaignsViewEntity } from '@/types/cheer.type';
import { useMemo } from 'react';

interface Props {
  cheerCampaign: EventCheerCampaignsViewEntity;
  totalParticipationCount: number;
  userTotalParticipationCount: number;
}

const CurrentCheerStatus = ({
  cheerCampaign,
  totalParticipationCount,
  userTotalParticipationCount,
}: Props) => {
  // 할인 정책
  const { nextTargetPolicy } = useMemo(() => {
    if (!cheerCampaign?.discountPolicies) {
      return { nextTargetPolicy: null };
    }

    const nextTargetPolicy = [...cheerCampaign.discountPolicies]
      .sort((a, b) => a.minParticipationCount - b.minParticipationCount)
      .find((policy) => policy.minParticipationCount > totalParticipationCount);

    return { nextTargetPolicy };
  }, [cheerCampaign?.discountPolicies, totalParticipationCount]);

  return (
    <article className="grid grid-cols-2">
      <div>
        <div className="text-12 font-500 leading-[160%] text-basic-grey-600">
          다음 할인율까지
        </div>
        <div className="flex items-center gap-[2px] text-14 font-500 leading-[160%] text-basic-black">
          {nextTargetPolicy ? (
            <>
              <span>{totalParticipationCount}</span>
              <span>/</span>
              <span>{nextTargetPolicy.minParticipationCount} 개</span>
            </>
          ) : (
            <span>목표 달성</span>
          )}
        </div>
      </div>
      <div>
        <div className="text-12 font-500 leading-[160%] text-basic-grey-600">
          참여한 응원 수
        </div>
        <div className="flex items-center gap-[2px] text-14 font-500 leading-[160%] text-basic-black">
          <span>{userTotalParticipationCount} 개</span>
        </div>
      </div>
    </article>
  );
};

export default CurrentCheerStatus;
