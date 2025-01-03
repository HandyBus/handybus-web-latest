'use client';

import NoticeSection from '@/components/notice-section/NoticeSection';
import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import ReservationShuttleInfo from '../sections/ReservationShuttleInfo';
import { NOTICE_TYPE } from '@/components/notice-section/NoticeSection';
import {
  SECTION,
  ShuttleRoute,
  ShuttleRouteHubObject,
} from '@/types/shuttle.types';
import { BottomBarType } from '@/components/shuttle-detail/bottom-bar/BottomBar.type';
import { useFormContext } from 'react-hook-form';
import { DailyShuttle, ReservationFormData } from '../page';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import { useCallback } from 'react';

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  dailyShuttleArray: DailyShuttle[];
  dailyShuttleRouteArray: ShuttleRoute[];
  routeHubsToDestination: ShuttleRouteHubObject[];
  routeHubsFromDestination: ShuttleRouteHubObject[];
}

const ShuttleWriteStep1 = ({
  handleNextStep,
  handlePrevStep,
  dailyShuttleArray,
  dailyShuttleRouteArray,
  routeHubsToDestination,
  routeHubsFromDestination,
}: Props) => {
  const { control, watch } = useFormContext<ReservationFormData>();
  const tripType = watch('tripType');
  const pickupHub = watch('toDestinationHubId');
  const dropoffHub = watch('fromDestinationHubId');
  const watchDailyShuttle = watch('dailyShuttle');
  const watchShuttleRoute = watch('shuttleRoute');

  const determineStep1 = useCallback(() => {
    let isSelectedHubs: boolean = false;
    if (tripType?.value === 'ROUND_TRIP')
      isSelectedHubs = Boolean(pickupHub && dropoffHub);
    if (tripType?.value === 'TO_DESTINATION')
      isSelectedHubs = Boolean(pickupHub);
    if (tripType?.value === 'FROM_DESTINATION')
      isSelectedHubs = Boolean(dropoffHub);

    if (watchDailyShuttle && watchShuttleRoute && tripType && isSelectedHubs)
      return false;
    return true;
  }, [watchDailyShuttle, watchShuttleRoute, tripType, pickupHub, dropoffHub]);

  return (
    <>
      <ReservationShuttleInfo
        control={control}
        dailyShuttleArray={dailyShuttleArray}
        dailyShuttleRouteArray={dailyShuttleRouteArray}
      />
      <div id="divider" className="my-16 h-[8px] bg-grey-50" />
      <ShuttleRouteVisualizer
        type={
          tripType?.value as
            | 'ROUND_TRIP'
            | 'TO_DESTINATION'
            | 'FROM_DESTINATION'
        }
        toDestinationObject={routeHubsToDestination}
        fromDestinationObject={routeHubsFromDestination}
        section={SECTION.RESERVATION_DETAIL}
      />
      <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
      <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
      <BottomBar
        type={`RESERVATION_WRITE_1` as BottomBarType}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        disabled={determineStep1()}
      />
    </>
  );
};

export default ShuttleWriteStep1;
