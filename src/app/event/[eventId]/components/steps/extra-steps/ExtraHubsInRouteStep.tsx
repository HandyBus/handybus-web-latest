'use client';

import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';
import Button from '@/components/buttons/button/Button';

const ExtraHubsInRouteStep = () => {
  const { getValues } = useFormContext<EventFormValues>();
  const selectedRouteForSeatAlarm = getValues('selectedRouteForSeatAlarm');
  const hubs =
    selectedRouteForSeatAlarm?.toDestinationShuttleRouteHubs ??
    selectedRouteForSeatAlarm.fromDestinationShuttleRouteHubs ??
    [];

  return (
    <section className="flex w-full flex-col gap-16">
      {hubs.map((hub) => (
        <button
          key={hub.shuttleRouteHubId}
          className="flex w-full items-center justify-between"
          disabled
        >
          <span className="text-16 font-500 text-basic-grey-600">
            {hub.name}
          </span>
          <Button
            variant="secondary"
            size="small"
            type="button"
            disabled
            className="w-72"
          >
            알림 받는 중
          </Button>
        </button>
      ))}
    </section>
  );
};

export default ExtraHubsInRouteStep;
