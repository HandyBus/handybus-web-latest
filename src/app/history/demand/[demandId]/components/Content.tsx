'use client';

import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import EventCard from './EventCard';
import ShuttleProgressSection from './sections/shuttle-progress-section/ShuttleProgressSection';
import DemandInfoSection from './sections/DemandInfoSection';
import GuidelineSection from './sections/GuidelineSection';
import CancelSection from './sections/cancel-section/CancelSection';

interface Props {
  demand: ShuttleDemandsViewEntity;
}

const Content = ({ demand }: Props) => {
  return (
    <main className="grow">
      <h1 className="px-16 pb-24 pt-12 text-18 font-600">수요조사 완료</h1>
      <EventCard event={demand.event} />
      <ShuttleProgressSection demand={demand} />
      <DemandInfoSection demand={demand} />
      <GuidelineSection />
      <CancelSection />
    </main>
  );
};

export default Content;
