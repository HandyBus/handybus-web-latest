import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { ReservationFormValues } from '../../Form';
import { useFormContext } from 'react-hook-form';
import { dateString } from '@/utils/dateString.util';
import { getBoardingTime } from '@/utils/common.util';

const ReservationInfo = () => {
  const { getValues } = useFormContext<ReservationFormValues>();
  const [shuttleRoute, passengerCount, type, hub] = getValues([
    'shuttleRoute',
    'passengerCount',
    'type',
    'hub',
  ]);

  const boardingTime = getBoardingTime({
    tripType: type ?? 'ROUND_TRIP',
    toDestinationShuttleRouteHubs:
      shuttleRoute?.toDestinationShuttleRouteHubs ?? [],
    fromDestinationShuttleRouteHubs:
      shuttleRoute?.fromDestinationShuttleRouteHubs ?? [],
    toDestinationShuttleRouteHubId:
      hub.toDestinationHub?.shuttleRouteHubId ?? '',
  });
  const parsedBoardingTime = boardingTime
    ? dateString(boardingTime, { showTime: true })
    : '';

  return (
    <>
      <section className="flex flex-col gap-16 py-28">
        <h2 className="text-22 font-700 text-grey-900">
          신청 정보를 확인해주세요
        </h2>
        <div className="grid grid-cols-[80px_1fr] gap-x-32 gap-y-12">
          <Item label="탑승 시간" value={parsedBoardingTime ?? ''} />
          <Item label="노선 종류" value={shuttleRoute?.name ?? ''} />
          <Item
            label="왕복 여부"
            value={TRIP_STATUS_TO_STRING[type ?? 'ROUND_TRIP']}
          />
          {(type === 'ROUND_TRIP' || type === 'TO_DESTINATION') && (
            <Item label="탑승 장소" value={hub.toDestinationHub?.name ?? ''} />
          )}
          {(type === 'ROUND_TRIP' || type === 'FROM_DESTINATION') && (
            <Item
              label="하차 장소"
              value={hub.fromDestinationHub?.name ?? ''}
            />
          )}
          <Item label="탑승객 수" value={`${passengerCount}명`} />
        </div>
      </section>
    </>
  );
};

export default ReservationInfo;

interface ItemProps {
  label: string;
  value: string;
}

const Item = ({ label, value }: ItemProps) => {
  return (
    <>
      <div className="text-16 font-400 leading-[24px] text-grey-600-sub">
        {label}
      </div>
      <div className="text-16 font-400 leading-[24px] text-grey-900">
        {value}
      </div>
    </>
  );
};
