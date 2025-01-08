import SelectModal from '@/components/modals/select/SelectModal';
import { useGetRoutes } from '@/services/shuttleOperation';
import { ShuttleType } from '@/types/shuttle.types';
import { useEffect, useState } from 'react';

interface Props {
  shuttle: ShuttleType;
  dailyShuttleId: number;
  bigRegion: string;
  smallRegion: string;
}

const RouteModal = ({
  shuttle,
  dailyShuttleId,
  bigRegion,
  smallRegion,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: openRoutes } = useGetRoutes(shuttle.shuttleId, dailyShuttleId, {
    provinceFullName: bigRegion,
    cityFullName: smallRegion,
    status: 'OPEN',
  });

  const date = shuttle.dailyShuttles.find(
    (dailyShuttle) => dailyShuttle.dailyShuttleId === dailyShuttleId,
  )?.date;
  const region = `${bigRegion} ${smallRegion}`;

  useEffect(() => {
    if (date && openRoutes) {
      setIsOpen(true);
    }
  }, [date, openRoutes]);

  if (!date || !openRoutes) return null;

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
