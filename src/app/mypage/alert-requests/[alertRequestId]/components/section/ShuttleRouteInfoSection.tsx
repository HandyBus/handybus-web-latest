import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

interface Props {
  shuttleRoute: ShuttleRoutesViewEntity;
}

const ShuttleRouteInfoSection = ({ shuttleRoute }: Props) => {
  const hubName = shuttleRoute.name;
  const toDestinationShuttleRouteHubs =
    shuttleRoute.toDestinationShuttleRouteHubs?.map((hub) => hub.name);
  const fromDestinationShuttleRouteHubs =
    shuttleRoute.fromDestinationShuttleRouteHubs?.map((hub) => hub.name);

  // 오는편/가는편 둘 중 하나는 반드시 존재함. 또한 hub는 미러링이 보장됨
  const shuttleRouteHubs =
    toDestinationShuttleRouteHubs || fromDestinationShuttleRouteHubs;

  return (
    <section className="px-16">
      <h3 className="pb-16 text-16 font-600">수요조사 상세</h3>
      <div className="grid grid-cols-[72px_1fr] gap-x-16 gap-y-8 pb-16 text-14 font-600">
        <h5>노선</h5>
        <p>{shuttleRoute.name}</p>
        <h5>정류장</h5>
        <p>{hubName}</p>
      </div>
      <div className="rounded-8 bg-basic-grey-50 p-8 text-12 font-500 leading-[160%] text-basic-grey-500">
        <h5 className="pb-4 text-14 leading-[160%] text-basic-grey-700 ">
          노선별 정류장
        </h5>
        <p className="pb-12">
          같은 노선은 한 대의 버스가 운행해요. 빈자리가 나면 어느 정류장이든 탈
          수 있어서 한 번만 알림 신청하면 돼요.
        </p>
        <p className="text-basic-grey-600">
          [{shuttleRoute.name}] {shuttleRouteHubs?.join(' - ')}
        </p>
      </div>
    </section>
  );
};

export default ShuttleRouteInfoSection;
