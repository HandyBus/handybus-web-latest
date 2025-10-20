'use client';

import { EventsViewEntity } from '@/types/event.type';
import EventForm from './event-form/EventForm';
import { Provider as JotaiProvider } from 'jotai';
import InfoIcon from 'public/icons/info.svg';
import DotIcon from '../icons/dot-primary.svg';
import PinIcon from '../icons/pin-primary.svg';
import { getShuttleRoutesOfDailyEvent } from '@/services/shuttleRoute.service';
import { useEffect, useState } from 'react';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { dateString } from '@/utils/dateString.util';
import dayjs from 'dayjs';

interface Props {
  event: EventsViewEntity;
  isNoDemandRewardCouponEvent: boolean;
  hasOpenRoute: boolean;
}

const EventContent = ({
  event,
  isNoDemandRewardCouponEvent,
  hasOpenRoute,
}: Props) => {
  return (
    <JotaiProvider>
      <EventForm
        event={event}
        isNoDemandRewardCouponEvent={isNoDemandRewardCouponEvent}
      />
      {hasOpenRoute && <ShuttleScheduleView event={event} />}
    </JotaiProvider>
  );
};

export default EventContent;

interface ShuttleScheduleViewProps {
  event: EventsViewEntity;
}

const ShuttleScheduleView = ({ event }: ShuttleScheduleViewProps) => {
  const { eventLocationName, dailyEvents } = event;
  const [earliestArrivalTime, setEarliestArrivalTime] = useState<string>('');
  const [earliestDepartureTime, setEarliestDepartureTime] =
    useState<string>('');

  const DATE_STRING_OPTIONS = {
    showYear: false,
    showDate: false,
    showTime: true,
    showWeekday: false,
  } as const;

  useEffect(() => {
    const fetchShuttleRoutes = async () => {
      try {
        const routes = await Promise.all(
          dailyEvents.map(async (dailyEvent) => {
            const result = await getShuttleRoutesOfDailyEvent(
              event.eventId,
              dailyEvent.dailyEventId,
            );
            return result;
          }),
        );
        const flatRoutes = routes.flat();

        const { earliestArrival, earliestDeparture } =
          getEarliestDestinationTime(flatRoutes);
        setEarliestArrivalTime(earliestArrival);
        setEarliestDepartureTime(earliestDeparture);
      } catch (error) {
        console.error('Failed to fetch shuttle routes:', error);
      }
    };

    fetchShuttleRoutes();
  }, [event.eventId, dailyEvents]);

  const isShuttleScheduleReady = earliestArrivalTime && earliestDepartureTime;

  if (!isShuttleScheduleReady) {
    return <ShuttleScheduleSkeleton />;
  }
  return (
    <section className="px-16 pb-24">
      <div className="-mx-16 mb-24 h-8 w-[calc(100%+32px)] bg-basic-grey-50" />
      <h3 className="pb-16 text-18 font-600 leading-[140%]">셔틀 스케줄</h3>

      <div className="mb-4 flex gap-[3px] rounded-[6px] bg-basic-grey-50 p-8">
        <InfoIcon className="shrink-0" />
        <p className="text-12 font-500 leading-[160%] text-basic-grey-600">
          전반적인 행사의 진행 시간에 따른 스케줄이에요. 일자별, 정류장별 정확한
          운행 시각은 예약 과정에서 확인할 수 있어요.
        </p>
      </div>

      <div className="flex gap-[6px] ">
        <section className="flex w-12 shrink-0 flex-col items-center py-[24px] pl-[5px]">
          <DotIcon />
          <div className="-my-[2px] h-[45px] w-[2px] bg-brand-primary-400" />
          <PinIcon />
          <div className="-my-[2px] h-[45px] w-[2px] bg-brand-primary-400" />
          <DotIcon />
          <div className="-my-[2px] h-[45px] w-[2px] bg-brand-primary-400" />
          <PinIcon />
        </section>

        <section className="w-full">
          <ShuttleHubItem
            boardingTime="정류장별 상이"
            description="정류장에서 승차"
          />
          <div className="h-[1px] border border-basic-grey-100" />
          <ShuttleHubItem
            boardingTime={dateString(earliestArrivalTime, DATE_STRING_OPTIONS)}
            description={eventLocationName}
          />
          <div className="h-[1px] border border-basic-grey-100" />
          <ShuttleHubItem
            boardingTime={dateString(
              earliestDepartureTime,
              DATE_STRING_OPTIONS,
            )}
            description="행사 종료 후 탑승"
          />
          <div className="h-[1px] border border-basic-grey-100" />
          <ShuttleHubItem
            boardingTime="정류장별 상이"
            description="최종 하차"
          />
        </section>
      </div>
    </section>
  );
};

const ShuttleHubItem = ({
  boardingTime,
  description,
}: {
  boardingTime: string;
  description: string;
}) => {
  return (
    <span className="flex items-center gap-[9px] px-8 py-16">
      <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
        {boardingTime}
      </p>
      <p className="text-14 font-600 leading-[160%]">{description}</p>
    </span>
  );
};

const ShuttleScheduleSkeleton = () => {
  return (
    <section className="px-16 pb-24">
      <div className="-mx-16 mb-24 h-8 w-[calc(100%+32px)] bg-basic-grey-50" />
      <div className="pb-16">
        <Skeleton width="45%" height={24} />
      </div>

      <div className="mb-4 flex gap-[3px] rounded-[6px] bg-basic-grey-50 p-8">
        <Skeleton width="100%" height={28} />
      </div>

      <div className="flex gap-[6px]">
        <section className="w-full space-y-[1px]">
          <div className="flex items-center gap-[9px] px-8 py-16">
            <Skeleton width="170px" height={16} />
          </div>
          <div className="h-[1px] border border-basic-grey-100" />
          <div className="flex items-center gap-[9px] px-8 py-16">
            <Skeleton width="170px" height={16} />
          </div>
          <div className="h-[1px] border border-basic-grey-100" />
          <div className="flex items-center gap-[9px] px-8 py-16">
            <Skeleton width="170px" height={16} />
          </div>
          <div className="h-[1px] border border-basic-grey-100" />
          <div className="flex items-center gap-[9px] px-8 py-16">
            <Skeleton width="170px" height={16} />
          </div>
        </section>
      </div>
    </section>
  );
};

const getEarliestDestinationTime = (routes: ShuttleRoutesViewEntity[]) => {
  let earliestArrival = '';
  let earliestDeparture = '';

  routes.forEach((route) => {
    if (route.toDestinationShuttleRouteHubs) {
      const destinationHub = route.toDestinationShuttleRouteHubs.find(
        (hub) => hub.role === 'DESTINATION',
      );
      if (destinationHub) {
        const arrivalTime = dayjs(destinationHub.arrivalTime);
        if (!earliestArrival || dayjs(earliestArrival).isAfter(arrivalTime)) {
          earliestArrival = destinationHub.arrivalTime;
        }
      }
    }

    if (route.fromDestinationShuttleRouteHubs) {
      const destinationHub = route.fromDestinationShuttleRouteHubs.find(
        (hub) => hub.role === 'DESTINATION',
      );
      if (destinationHub) {
        const departureTime = dayjs(destinationHub.arrivalTime);
        if (
          !earliestDeparture ||
          dayjs(earliestDeparture).isAfter(departureTime)
        ) {
          earliestDeparture = destinationHub.arrivalTime;
        }
      }
    }
  });

  return { earliestArrival, earliestDeparture };
};
