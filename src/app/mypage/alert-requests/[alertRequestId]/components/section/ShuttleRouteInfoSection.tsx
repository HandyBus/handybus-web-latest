import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  ShuttleRoutesViewEntity,
} from '@/types/shuttleRoute.type';
import WrapperWithDivider from '../WrapperWithDivider';
import InfoIcon from '../../icons/info.svg';

interface Props {
  shuttleRoute: ShuttleRoutesViewEntity;
}

const ShuttleRouteInfoSection = ({ shuttleRoute }: Props) => {
  const toDestinationHubs = shuttleRoute.toDestinationShuttleRouteHubs ?? [];
  const fromDestinationHubs =
    shuttleRoute.fromDestinationShuttleRouteHubs ?? [];
  const destinationHubs = [...toDestinationHubs, ...fromDestinationHubs].reduce(
    (acc, hub) => {
      if (
        hub.role === 'HUB' &&
        !acc.some((h) => h.regionHubId === hub.regionHubId)
      ) {
        acc.push(hub);
      }
      return acc;
    },
    [] as ShuttleRouteHubsInShuttleRoutesViewEntity[],
  );

  const hubText = destinationHubs.map((hub) => hub.name).join(' - ');

  return (
    <WrapperWithDivider>
      <section className="px-16">
        <h3 className="pb-16 text-16 font-600">요청 상세</h3>
        <div className="grid grid-cols-[72px_1fr] gap-x-16 gap-y-8 pb-16 text-14 font-600">
          <h5>정류장</h5>
          <p>{hubText}</p>
        </div>
        <div className="mb-16 h-[1.5px] w-full bg-basic-grey-100" />
        <h6 className="mb-12 flex items-center gap-[2px] text-14 font-500 leading-[160%] text-basic-grey-700">
          <InfoIcon />
          <span>요청하지 않은 다른 정류장이 보여진다면</span>
        </h6>
        <div className="mb-8 rounded-8 bg-basic-grey-50 p-8 text-12 font-500 leading-[160%] text-basic-grey-700">
          보여지는 모든 정류장은 동일한 노선을 지나고 있어요.
        </div>
        <ul
          className="space-y-2 list-outside pl-4 text-14 font-400 text-basic-grey-500"
          style={{ listStyleType: 'none' }}
        >
          <li className="relative pl-12 before:absolute before:left-0 before:content-['*']">
            모든 버스는 단일 노선으로 운행되므로 빈자리가 생기면 노선 내 모든
            정류장에서 예약이 가능합니다.
          </li>
          <li className="relative pl-12 before:absolute before:left-0 before:content-['*']">
            알림 신청은 1회 신청으로 노선 내 모든 정류장에 동일하게 적용됩니다.
          </li>
        </ul>
      </section>
    </WrapperWithDivider>
  );
};

export default ShuttleRouteInfoSection;
