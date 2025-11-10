'use client';

import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import EventCard from './EventCard';
import ShuttleProgressSection from './sections/shuttle-progress-section/ShuttleProgressSection';
import DemandInfoSection from './sections/DemandInfoSection';
import GuidelineSection from './sections/GuidelineSection';
import CancelSection from './sections/cancel-section/CancelSection';
import CheckIcon from '../icons/icon-check.svg';

interface Props {
  demand: ShuttleDemandsViewEntity;
}

const Content = ({ demand }: Props) => {
  return (
    <main className="grow">
      <h1 className="flex items-center gap-[6px] px-16 pb-24 pt-12 text-18 font-600">
        <CheckIcon />
        <span>수요조사 완료</span>
      </h1>
      <EventCard event={demand.event} />
      <ShuttleProgressSection demand={demand} />
      <DemandInfoSection demand={demand} />
      <GuidelineSection />
      <CancelSection demand={demand} />
    </main>
  );
};

export default Content;
