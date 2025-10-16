'use client';

import { ShuttleRouteAlertRequestsViewEntity } from '@/types/alertRequest.type';
import EventCard from './EventCard';
import ShuttleProgressSection from './section/ShuttleProgressSection';
import GuidelineSection from './section/GuidelineSection';
import ShuttleRouteInfoSection from './section/ShuttleRouteInfoSection';

interface Props {
  alertRequest: ShuttleRouteAlertRequestsViewEntity;
  isApp: boolean;
}

const Content = ({ alertRequest, isApp }: Props) => {
  return (
    <main className="grow">
      <EventCard event={alertRequest.shuttleRoute.event} isApp={isApp} />
      <ul className="flex flex-col gap-24 pb-20">
        <ShuttleProgressSection alertRequest={alertRequest} />
        <ShuttleRouteInfoSection shuttleRoute={alertRequest.shuttleRoute} />
        <GuidelineSection />
      </ul>
    </main>
  );
};

export default Content;
