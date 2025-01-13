import { ROUTE_STATUS_TO_STRING } from '@/constants/status';
import { ShuttleRouteStatus } from '@/types/v2-temp/shuttle-operation.type';

interface Props {
  status: ShuttleRouteStatus;
}

const RouteStatusChip = ({ status }: Props) => {
  const statusString = ROUTE_STATUS_TO_STRING[status];
  switch (status) {
    case 'OPEN':
      return (
        <div className="w-fit whitespace-nowrap  rounded-full bg-primary-main px-[14px] py-[3px] text-12 text-white">
          {statusString}
        </div>
      );
    case 'CLOSED':
    case 'CONFIRMED':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-black px-[14px] py-[3px] text-12 text-white">
          {statusString}
        </div>
      );
    case 'ENDED':
    case 'CANCELLED':
    case 'INACTIVE':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-grey-100 px-[14px] py-[3px] text-12 text-black">
          {statusString}
        </div>
      );
  }
};

export default RouteStatusChip;
