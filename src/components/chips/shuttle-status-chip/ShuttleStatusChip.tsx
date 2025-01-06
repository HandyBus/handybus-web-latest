import { SHUTTLE_STATUS_TO_STRING } from '@/constants/status';
import { ShuttleStatusType } from '@/types/shuttle.types';

interface Props {
  status: ShuttleStatusType;
}

const ShuttleStatusChip = ({ status }: Props) => {
  const statusString = SHUTTLE_STATUS_TO_STRING[status];
  switch (status) {
    case 'OPEN':
      return (
        <div className="w-fit whitespace-nowrap  rounded-full bg-[#FEF87A] px-[14px] py-[3px] text-12 text-black">
          {statusString}
        </div>
      );
    case 'CLOSED':
    case 'ENDED':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-black px-[14px] py-[3px] text-12 text-white">
          {statusString}
        </div>
      );
    case 'INACTIVE':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-grey-100 px-[14px] py-[3px] text-12 text-black">
          {statusString}
        </div>
      );
  }
};

export default ShuttleStatusChip;
