import { useMemo } from 'react';
import { EventCheerCampaignsViewEntity } from '@/types/cheer.type';

interface Props {
  cheerCampaign: EventCheerCampaignsViewEntity;
  totalParticipationCount: number;
}

const DiscountPolicies = ({
  cheerCampaign,
  totalParticipationCount,
}: Props) => {
  // 할인 정책
  const { sortedPolicies, nextTargetPolicy } = useMemo(() => {
    if (!cheerCampaign?.discountPolicies) {
      return { sortedPolicies: [], nextTargetPolicy: null };
    }

    const sortedPolicies = [...cheerCampaign.discountPolicies].sort(
      (a, b) => a.minParticipationCount - b.minParticipationCount,
    );
    const nextTargetPolicy = sortedPolicies.find(
      (policy) => policy.minParticipationCount > totalParticipationCount,
    );

    return { sortedPolicies, nextTargetPolicy };
  }, [cheerCampaign?.discountPolicies, totalParticipationCount]);

  // 할인 정책 상태 계산
  const getPolicyStatus = (policy: {
    minParticipationCount: number;
  }): PolicyStatus => {
    if (policy.minParticipationCount <= totalParticipationCount) {
      return 'achieved';
    }
    if (
      nextTargetPolicy?.minParticipationCount === policy.minParticipationCount
    ) {
      return 'next';
    }
    return 'pending';
  };

  return (
    <article className="flex items-center gap-4">
      <div className="flex flex-1 flex-col items-center gap-[3px]">
        <div className="h-[10px] w-full rounded-full bg-brand-primary-400" />
        <span className="text-10 font-400">응원 시작</span>
      </div>
      {sortedPolicies.map((policy) => (
        <DiscountProgressBarItem
          key={policy.eventCheerDiscountPolicyId}
          discountRate={policy.discountRate}
          minParticipationCount={policy.minParticipationCount}
          status={getPolicyStatus(policy)}
        />
      ))}
    </article>
  );
};

export default DiscountPolicies;

type PolicyStatus = 'achieved' | 'next' | 'pending';

interface DiscountProgressBarItemProps {
  discountRate: number;
  minParticipationCount: number;
  status: PolicyStatus;
}

const DiscountProgressBarItem = ({
  discountRate,
  status,
}: DiscountProgressBarItemProps) => {
  const getBackgroundColor = () => {
    switch (status) {
      case 'achieved':
        return 'bg-brand-primary-400';
      case 'next':
        return 'bg-brand-primary-100';
      case 'pending':
        return 'bg-basic-grey-200';
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center gap-[3px]">
      <div className={`h-[10px] w-full rounded-full ${getBackgroundColor()}`} />
      <span className="text-10 font-400">{discountRate}%</span>
    </div>
  );
};
