import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import WrapperWithDivider from '../WrapperWithDivider';

interface Props {
  demand: ShuttleDemandsViewEntity;
}

const DemandInfoSection = ({ demand }: Props) => {
  const hubName =
    demand.toDestinationRegionHub?.name ||
    demand.fromDestinationRegionHub?.name ||
    demand.desiredToDestinationRegionHub ||
    demand.desiredFromDestinationRegionHub;
  return (
    <WrapperWithDivider>
      <section className="px-16 py-24">
        <h3 className="pb-16 text-16 font-600">수요조사 상세</h3>
        <div className="grid grid-cols-[72px_1fr] gap-x-16 gap-y-8 text-14 font-600">
          <h5>탑승 유형</h5>
          <p>{TRIP_STATUS_TO_STRING[demand.type]}</p>
          <h5>정류장</h5>
          <p>{hubName}</p>
        </div>
      </section>
    </WrapperWithDivider>
  );
};

export default DemandInfoSection;
