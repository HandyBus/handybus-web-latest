import Badge from '@/components/badge/Badge';
import { ShuttleBusesViewEntity } from '@/types/shuttleBus.type';

interface Props {
  shuttleBus: ShuttleBusesViewEntity | null | undefined;
}

const ShuttleBusBadge = ({ shuttleBus }: Props) => {
  const shuttleBusNumber = shuttleBus ? shuttleBus.busNumber : '';

  return (
    shuttleBusNumber && (
      <Badge className="border border-basic-grey-200 text-basic-grey-700">
        {shuttleBusNumber}
      </Badge>
    )
  );
};

export default ShuttleBusBadge;
