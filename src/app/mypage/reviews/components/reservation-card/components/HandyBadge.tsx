import Badge from '@/components/badge/Badge';
import { HandyStatus } from '@/types/reservation.type';

interface Props {
  handyStatus: HandyStatus;
}

const HandyBadge = ({ handyStatus }: Props) => {
  switch (handyStatus) {
    case 'ACCEPTED':
      return (
        <Badge className="bg-basic-blue-100 text-basic-blue-400">핸디</Badge>
      );
    case 'DECLINED':
      return (
        <Badge className="bg-basic-grey-200 text-basic-grey-700">미선정</Badge>
      );
    case 'SUPPORTED':
      return (
        <Badge className="bg-brand-primary-50 text-brand-primary-400">
          핸디 심사중
        </Badge>
      );
    default:
      return null;
  }
};

export default HandyBadge;
