import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { dateString } from '@/utils/dateString';
import Divider from './Divider';
import { ReservationFormValues } from '../../Form';
import { useFormContext } from 'react-hook-form';
import { Event } from '@/types/v2-temp/shuttle-operation.type';

interface Props {
  event: Event;
}

const ReservationInfo = ({ event }: Props) => {
  const { getValues } = useFormContext<ReservationFormValues>();
  const [shuttleRoute, passengers, type, hub] = getValues([
    'shuttleRoute',
    'passengers',
    'type',
    'hub',
  ]);
  const parsedDate = dateString(
    event.dailyEvents.find(
      (dailyEvent) => dailyEvent.dailyEventId === shuttleRoute?.dailyEventId,
    )?.date,
  );

  return (
    <>
      <section className="flex flex-col gap-16 py-28">
        <h2 className="text-22 font-700 text-grey-900">
          예약내역을 확인해주세요
        </h2>
        <div className="grid grid-cols-[80px_1fr] gap-x-32 gap-y-12">
          <Item label="탑승일" value={parsedDate} />
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
          <Item label="탑승객 수" value={`${passengers.length}명`} />
        </div>
      </section>
      <Divider />
      <section className="flex flex-col gap-32 py-32">
        {passengers.map((passenger, index) => (
          <article key={index}>
            <div className="flex flex-col gap-[16px]">
              <h3 className="text-18 font-500 text-grey-700">
                탑승객 {index + 1}
              </h3>
              <div className="grid grid-cols-[80px_1fr] gap-x-32 gap-y-12">
                <Item label="이름" value={passenger.name} />
                <Item label="전화번호" value={passenger.phoneNumber} />
              </div>
            </div>
          </article>
        ))}
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
