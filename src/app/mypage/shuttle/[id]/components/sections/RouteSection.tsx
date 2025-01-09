'use client';

import Divider from '../Divider';
import { TripType } from '@/types/shuttle.types';
import { HubType, HubWithSelectedType } from '@/types/hub.type';
import { SyntheticEvent, useEffect, useState } from 'react';
import { usePostUpdateReservation } from '@/services/reservation';
import { toast } from 'react-toastify';
import RouteVisualizer from '@/components/route-visualizer/RouteVisualizer';
import RouteVisualizerWithSelect from '@/components/route-visualizer/RouteVisualizerWithSelect';

interface Props {
  isShuttleBusAssigned: boolean;
  reservationId: number;
  tripType: TripType;
  hubs: {
    toDestination: HubWithSelectedType[];
    fromDestination: HubWithSelectedType[];
  };
}

const RouteSection = ({
  isShuttleBusAssigned,
  reservationId,
  tripType,
  hubs,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const [toDestinationHubValue, setToDestinationHubValue] = useState<HubType>();
  const [fromDestinationHubValue, setFromDestinationHubValue] =
    useState<HubType>();

  const setInitialHubValue = () => {
    const selectedToDestination = hubs.toDestination.find(
      (hub) => hub.selected,
    );
    const selectedFromDestination = hubs.fromDestination.find(
      (hub) => hub.selected,
    );
    setToDestinationHubValue(selectedToDestination);
    setFromDestinationHubValue(selectedFromDestination);
  };
  useEffect(() => {
    setInitialHubValue();
  }, []);

  const onError = () => {
    toast.error('탑승지 변경에 실패했습니다.');
    setInitialHubValue();
  };
  const { mutate: updateReservation } = usePostUpdateReservation(
    reservationId,
    undefined,
    onError,
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsEdit(false);
    updateReservation({
      toDestinationShuttleRouteHubId: toDestinationHubValue?.shuttleRouteHubId,
      fromDestinationShuttleRouteHubId:
        fromDestinationHubValue?.shuttleRouteHubId,
    });
  };

  return (
    <>
      <Divider />
      <form onSubmit={handleSubmit}>
        <section className="px-16 py-24">
          {isEdit ? (
            <RouteVisualizerWithSelect
              type={tripType}
              toDestinationHubs={hubs.toDestination}
              fromDestinationHubs={hubs.fromDestination}
              toDestinationHubValue={toDestinationHubValue}
              fromDestinationHubValue={fromDestinationHubValue}
              setToDestinationHubValue={setToDestinationHubValue}
              setFromDestinationHubValue={setFromDestinationHubValue}
            />
          ) : (
            <RouteVisualizer
              type={tripType}
              toDestinationHubs={hubs.toDestination}
              fromDestinationHubs={hubs.fromDestination}
              isSelected={true}
              selectedToDestinationHub={toDestinationHubValue}
              selectedFromDestinationHub={fromDestinationHubValue}
            />
          )}
        </section>
        {!isShuttleBusAssigned && (
          <div className="flex flex-col items-end gap-8 pb-24 pr-24">
            {isEdit ? (
              <div className="flex gap-8">
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="h-[26px] rounded-full border border-grey-100 px-16 text-14 text-grey-600-sub"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="h-[26px] rounded-full border border-grey-100 bg-grey-700 px-16 text-14 text-white"
                >
                  완료
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEdit(true)}
                  className="h-[26px] rounded-full bg-grey-100 px-16 text-14 text-grey-600-sub"
                >
                  탑승지 변경하기
                </button>
                <p className="text-12 font-400 text-grey-500">
                  탑승지 변경은 셔틀 운행일 기준 D-2일까지 가능합니다.
                </p>
              </>
            )}
          </div>
        )}
      </form>
    </>
  );
};

export default RouteSection;
