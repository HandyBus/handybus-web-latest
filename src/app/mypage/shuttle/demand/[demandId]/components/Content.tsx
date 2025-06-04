'use client';

import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import EventCard from './EventCard';
import WrapperWithDivider from './WrapperWithDivider';
import ShuttleProgressSection from './sections/shuttle-progress-section/ShuttleProgressSection';
import DemandInfoSection from './sections/DemandInfoSection';
import GuidelineSection from './sections/GuidelineSection';

interface Props {
  demand: ShuttleDemandsViewEntity;
}

const Content = ({ demand }: Props) => {
  return (
    <main className="grow pb-16">
      <h1 className="px-16 pb-24 pt-12 text-22 font-700">수요조사 완료</h1>
      <EventCard event={demand.event} />
      <ul className="flex flex-col gap-24">
        <WrapperWithDivider>
          <ShuttleProgressSection demand={demand} />
        </WrapperWithDivider>
        <WrapperWithDivider>
          <DemandInfoSection demand={demand} />
        </WrapperWithDivider>
        <GuidelineSection />
      </ul>
    </main>
  );
};

export default Content;
