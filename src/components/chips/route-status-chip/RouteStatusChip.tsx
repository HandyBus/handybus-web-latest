import { SHUTTLE_ROUTE_STATUS_TO_STRING } from '@/constants/status';
import { ShuttleRouteStatus } from '@/types/shuttleRoute.type';

interface Props {
  status: ShuttleRouteStatus;
}

const RouteStatusChip = ({ status }: Props) => {
  const statusString = SHUTTLE_ROUTE_STATUS_TO_STRING[status];
  switch (status) {
    case 'OPEN':
      return (
        <div className="w-fit whitespace-nowrap  rounded-full bg-brand-primary-400 px-[14px] py-[3px] text-12 text-basic-white">
          {statusString}
        </div>
      );
    case 'CLOSED':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-basic-black px-[14px] py-[3px] text-12 text-basic-white">
          {statusString}
        </div>
      );
    case 'ENDED':
    case 'CANCELLED':
    case 'INACTIVE':
      return (
        <div className="bg-basic-grey-100 w-fit whitespace-nowrap rounded-full px-[14px] py-[3px] text-12 text-basic-black">
          {statusString}
        </div>
      );
  }
};

export default RouteStatusChip;
