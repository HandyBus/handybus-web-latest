import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import ShuttleScheduleSkeleton from './ShuttleScheduleSkeleton';
import { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';
import { getEarliestDestinationTime } from '@/app/event/utils/getEarliestDestinationTime.util';
import InfoIcon from 'public/icons/info.svg';
import DotIcon from '../../../icons/dot-primary.svg';
import PinIcon from '../../../icons/pin-primary.svg';

export const GD_FANMEETING_EVENT_ID = '664379065943202277';

interface ShuttleScheduleViewProps {
  event: EventsViewEntity;
  shuttleRoutes: ShuttleRoutesViewEntity[];
}

const ShuttleScheduleView = ({
  event,
  shuttleRoutes,
}: ShuttleScheduleViewProps) => {
  const { eventLocationName } = event;

  const DATE_STRING_OPTIONS = {
    showYear: false,
    showDate: false,
    showTime: true,
    showWeekday: false,
  } as const;

  const { earliestDestinationArrival, earliestDestinationDeparture } =
    getEarliestDestinationTime(shuttleRoutes);

  const isShuttleScheduleReady =
    earliestDestinationArrival && earliestDestinationDeparture;

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
          <div className="-my-[2px] h-[46.8px] w-[2px] bg-brand-primary-400" />
          <PinIcon />
          <div className="-my-[2px] h-[46.8px] w-[2px] bg-brand-primary-400" />
          <DotIcon />
          <div className="-my-[2px] h-[46.8px] w-[2px] bg-brand-primary-400" />
          <PinIcon />
        </section>

        <section className="w-full">
          <ShuttleHubItem
            boardingTime="정류장별 상이"
            description="정류장에서 승차"
          />
          <div className="h-[1px] border border-basic-grey-100" />
          <ShuttleHubItem
            boardingTime={
              event.eventId !== GD_FANMEETING_EVENT_ID
                ? dateString(earliestDestinationArrival, DATE_STRING_OPTIONS) +
                  '~'
                : '미정'
            }
            description={eventLocationName}
          />
          <div className="h-[1px] border border-basic-grey-100" />
          <ShuttleHubItem
            boardingTime={
              event.eventId !== GD_FANMEETING_EVENT_ID
                ? dateString(
                    earliestDestinationDeparture,
                    DATE_STRING_OPTIONS,
                  ) + '~'
                : '미정'
            }
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

export default ShuttleScheduleView;

const ShuttleHubItem = ({
  boardingTime,
  description,
}: {
  boardingTime: string;
  description: string;
}) => {
  return (
    <span className="flex items-center gap-[9px] px-8 py-16">
      <p className="w-[66px] text-12 font-500 leading-[160%] text-basic-grey-700">
        {boardingTime}
      </p>
      <p className="text-14 font-600 leading-[160%]">{description}</p>
    </span>
  );
};
