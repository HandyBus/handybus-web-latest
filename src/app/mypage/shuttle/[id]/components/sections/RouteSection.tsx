'use client';

import Divider from '../Divider';
import { SyntheticEvent, useEffect, useState } from 'react';
import RouteVisualizer from '@/components/route-visualizer/RouteVisualizer';
import RouteVisualizerWithSelect from '@/components/route-visualizer/RouteVisualizerWithSelect';
import { ShuttleRouteHub, TripType } from '@/types/shuttle-operation.type';
import { usePostUpdateReservation } from '@/services/shuttle-operation.service';
import Button from '@/components/buttons/button/Button';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  reservationId: string;
  tripType: TripType;
  toDestinationHubs: ShuttleRouteHub[];
  fromDestinationHubs: ShuttleRouteHub[];
  toDestinationHubId: string;
  fromDestinationHubId: string;
  date: Dayjs | null;
}

const RouteSection = ({
  reservationId,
  tripType,
  toDestinationHubs,
  fromDestinationHubs,
  toDestinationHubId,
  fromDestinationHubId,
  date,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const [toDestinationHubValue, setToDestinationHubValue] =
    useState<ShuttleRouteHub>();
  const [fromDestinationHubValue, setFromDestinationHubValue] =
    useState<ShuttleRouteHub>();

  const setInitialHubValue = () => {
    const selectedToDestination = toDestinationHubs.find(
      (hub) => hub.shuttleRouteHubId === toDestinationHubId,
    );
    const selectedFromDestination = fromDestinationHubs.find(
      (hub) => hub.shuttleRouteHubId === fromDestinationHubId,
    );
    setToDestinationHubValue(selectedToDestination);
    setFromDestinationHubValue(selectedFromDestination);
  };
  useEffect(() => {
    setInitialHubValue();
  }, []);

  const onError = () => {
    setInitialHubValue();
  };
  const { mutate: updateReservation } = usePostUpdateReservation(
    reservationId,
    {
      onError,
    },
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

  const checkCanEditHub = () => {
    if (!date) {
      return false;
    }
    const today = dayjs().tz().toDate();
    const twoDaysAgo = date.subtract(2, 'day').toDate();
    return today <= twoDaysAgo;
  };
  const canEditHub = checkCanEditHub();

  return (
    <>
      <Divider />
      <form onSubmit={handleSubmit}>
        <section className="px-16 py-32">
          {isEdit ? (
            <RouteVisualizerWithSelect
              type={tripType}
              toDestinationHubs={toDestinationHubs}
              fromDestinationHubs={fromDestinationHubs}
              toDestinationHubValue={toDestinationHubValue}
              fromDestinationHubValue={fromDestinationHubValue}
              setToDestinationHubValue={setToDestinationHubValue}
              setFromDestinationHubValue={setFromDestinationHubValue}
            />
          ) : (
            <RouteVisualizer
              type={tripType}
              toDestinationHubs={toDestinationHubs}
              fromDestinationHubs={fromDestinationHubs}
              isSelected={true}
              selectedToDestinationHub={toDestinationHubValue}
              selectedFromDestinationHub={fromDestinationHubValue}
            />
          )}
        </section>
        {canEditHub && (
          <div className="flex flex-col items-end gap-8 px-16 pb-32">
            {isEdit ? (
              <div className="flex w-full gap-8">
                <Button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  variant="secondary"
                >
                  취소
                </Button>
                <Button type="submit" variant="primary">
                  완료
                </Button>
              </div>
            ) : (
              <>
                <Button type="button" onClick={() => setIsEdit(true)}>
                  탑승지 변경
                </Button>
                <p className="text-12 font-400 text-grey-500">
                  탑승지 변경은 행사 일자 기준 2일 전까지 가능합니다.
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
