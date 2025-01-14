import SelectModal from '@/components/modals/select/SelectModal';
import { useGetShuttleRoutesOfDailyEvent } from '@/services/shuttle-operation.service';
import { Event } from '@/types/shuttle-operation.type';
import { useEffect, useState } from 'react';

interface Props {
  event: Event;
  dailyEventId: number;
  bigRegion: string;
  smallRegion: string;
}

const RouteModal = ({ event, dailyEventId, bigRegion, smallRegion }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: openRoutes } = useGetShuttleRoutesOfDailyEvent(
    event.eventId,
    dailyEventId,
    {
      status: 'OPEN',
      provinceFullName: bigRegion,
      cityFullName: smallRegion,
    },
  );

  const date = event.dailyEvents.find(
    (dailyEvent) => dailyEvent.dailyEventId === dailyEventId,
  )?.date;
  const region = `${bigRegion} ${smallRegion}`;

  useEffect(() => {
    if (date && openRoutes) {
      setIsOpen(true);
    }
  }, [date, openRoutes]);

  if (!date || !openRoutes || openRoutes.length === 0) return null;

  return (
    <SelectModal
      isOpen={isOpen}
      onClosed={() => setIsOpen(false)}
      date={date}
      region={region}
      routes={openRoutes}
    />
  );
};

export default RouteModal;
