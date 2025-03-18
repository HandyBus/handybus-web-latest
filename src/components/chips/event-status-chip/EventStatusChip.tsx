import { EVENT_STATUS_TO_STRING } from '@/constants/status';
import { EventStatus } from '@/types/event.type';

interface Props {
  status: EventStatus;
}

const EventStatusChip = ({ status }: Props) => {
  const statusString = EVENT_STATUS_TO_STRING[status];
  switch (status) {
    case 'OPEN':
      return (
        <div className="w-fit whitespace-nowrap  rounded-full bg-[#FEF87A] px-[14px] py-[3px] text-12 text-basic-black">
          {statusString}
        </div>
      );
    case 'CLOSED':
    case 'ENDED':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-basic-black px-[14px] py-[3px] text-12 text-basic-white">
          {statusString}
        </div>
      );
    case 'INACTIVE':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-brand-grey-100 px-[14px] py-[3px] text-12 text-basic-black">
          {statusString}
        </div>
      );
  }
};

export default EventStatusChip;
