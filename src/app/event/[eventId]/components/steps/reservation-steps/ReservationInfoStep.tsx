'use client';

import Button from '@/components/buttons/button/Button';
import { ReactNode } from 'react';
import { customTwMerge } from 'tailwind.config';
import SimpleRouteInfo from '../../SimpleRouteInfo';
import { MOCK_SHUTTLE_ROUTE } from '../../../mock.const';
import AddIcon from '../../../icons/add.svg';
import SubtractIcon from '../../../icons/subtract.svg';

const ReservationInfoStep = () => {
  const hubs = MOCK_SHUTTLE_ROUTE.toDestinationShuttleRouteHubs ?? [];

  return (
    <section className="flex w-full flex-col gap-16">
      <Container className="flex flex-col gap-12">
        <div className="flex h-[31px] w-full items-center justify-between">
          <span className="text-16 font-600">[왕복] 가는 편</span>
          <Button variant="tertiary" size="small" type="button">
            변경
          </Button>
        </div>
        <div className="h-[1px] w-full bg-basic-grey-100" />
        <SimpleRouteInfo
          tripType="TO_DESTINATION"
          hubs={hubs}
          selectedHubId={hubs[hubs.length - 3].shuttleRouteHubId}
        />
      </Container>
      <Container className="flex flex-col gap-12">
        <div className="flex h-[31px] w-full items-center justify-between">
          <span className="text-16 font-600">[왕복] 오는 편</span>
          <Button variant="tertiary" size="small">
            변경
          </Button>
        </div>
        <div className="h-[1px] w-full bg-basic-grey-100" />
        <SimpleRouteInfo
          tripType="FROM_DESTINATION"
          hubs={hubs}
          selectedHubId={hubs[hubs.length - 2].shuttleRouteHubId}
        />
      </Container>
      <Container className="flex items-center justify-between p-8">
        <button
          type="button"
          className="flex h-[35px] w-[51px] items-center justify-center rounded-8 bg-basic-grey-50 active:bg-basic-grey-200"
        >
          <SubtractIcon />
        </button>
        <span className="text-16 font-500">1</span>
        <button
          type="button"
          className="flex h-[35px] w-[51px] items-center justify-center rounded-8 bg-basic-grey-50 active:bg-basic-grey-200"
        >
          <AddIcon />
        </button>
      </Container>
      <article className="flex h-[26px] items-center justify-between">
        <span className="text-14 font-500 text-basic-grey-700">
          32,000원 x 2
        </span>
        <span className="text-16 font-500">64,000원</span>
      </article>
      <Button variant="primary" size="large" type="button">
        예약하기
      </Button>
    </section>
  );
};

export default ReservationInfoStep;

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <article
      className={customTwMerge(
        'rounded-12 border border-basic-grey-100 p-12',
        className,
      )}
    >
      {children}
    </article>
  );
};
