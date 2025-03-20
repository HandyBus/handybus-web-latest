import CustomModal from '../CustomModal';
import ChevronRight from 'public/icons/quill-chevron-right.svg';
import Button from '@/components/buttons/button/Button';
import { dateString } from '@/utils/dateString.util';
import Link from 'next/link';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

interface Props {
  isOpen: boolean;
  onClosed: () => void;
  date: string;
  region: string;
  routes: ShuttleRoutesViewEntity[];
}

const SelectModal = ({ isOpen, onClosed, date, region, routes }: Props) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClosed={onClosed}
      styles="fixed top-50 left-50 z-[101] flex max-h-[540px] w-[301px] flex-col items-center justify-center gap-16 bg-basic-white px-24 py-20 rounded-20"
    >
      <SelectModalContent
        date={date}
        region={region}
        routes={routes}
        onClosed={onClosed}
      />
    </CustomModal>
  );
};

export default SelectModal;

interface SelectModalContentProps {
  date: string;
  region: string;
  routes: ShuttleRoutesViewEntity[];
  onClosed: () => void;
}

const SelectModalContent = ({
  date,
  region,
  routes,
  onClosed,
}: SelectModalContentProps) => {
  const parsedDate = dateString(date);
  return (
    <>
      <h2 id="modal-title" className="text-22 font-700 leading-[30.8px] ">
        현재 예약을 받고 있는 노선이 있어요
      </h2>
      <p
        id="modal-description"
        className="text-16 font-500 leading-6 text-basic-grey-500"
      >
        <span className="leading-[25.6px] text-basic-grey-700">
          {parsedDate}
        </span>
        에{' '}
        <span className="leading-[25.6px] text-basic-grey-700">{region}</span>
        에서 탈 만한 노선을 알려드릴게요.
      </p>
      <div id="shuttle-bus-route-information" className="flex flex-col gap-8">
        {routes.slice(0, 4).map((route) => (
          <SelectModalButton key={route.shuttleRouteId} route={route} />
        ))}
      </div>
      <div className="flex w-[100%] flex-col gap-8">
        <Button variant="tertiary" onClick={onClosed}>
          이동 안 할래요
        </Button>
      </div>
    </>
  );
};

interface SelectModalButtonProps {
  route: ShuttleRoutesViewEntity;
}

const SelectModalButton = ({ route }: SelectModalButtonProps) => {
  return (
    <Link
      href={`/reservation/${route.eventId}?dailyEventId=${route.dailyEventId}&shuttleRouteId=${route.shuttleRouteId}`}
      className="h-58 flex w-252 items-center justify-between rounded-[11px] border border-basic-grey-200 px-24 py-16"
    >
      <p className="text-16 font-500 leading-[25.6px] text-basic-grey-700">
        {route.name}
      </p>
      <ChevronRight color="#999999" />
    </Link>
  );
};
