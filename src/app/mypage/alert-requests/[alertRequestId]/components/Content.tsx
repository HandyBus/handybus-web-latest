'use client';

import { ShuttleRouteAlertRequestsViewEntity } from '@/types/alertRequest.type';
import EventCard from './EventCard';
import WrapperWithDivider from './WrapperWithDivider';
import ShuttleProgressSection from './section/shuttle-progress-section/ShuttleProgressSection';
import GuidelineSection from './section/GuidelineSection';
import ShuttleRouteInfoSection from './section/ShuttleRouteInfoSection';

interface Props {
  alertRequest: ShuttleRouteAlertRequestsViewEntity;
}

const Content = ({ alertRequest }: Props) => {
  return (
    <main className="grow">
      <h1 className="px-16 pb-24 pt-12 text-22 font-700">빈자리 알림 요청</h1>
      <EventCard event={alertRequest.shuttleRoute.event} />
      <ul className="flex flex-col gap-24">
        <WrapperWithDivider>
          <ShuttleProgressSection alertRequest={alertRequest} />
        </WrapperWithDivider>
        <WrapperWithDivider>
          <ShuttleRouteInfoSection shuttleRoute={alertRequest.shuttleRoute} />
        </WrapperWithDivider>
        <GuidelineSection />
      </ul>
    </main>
  );
};

export default Content;
