import Link from 'next/link';
import Image from 'next/image';
import dateString from '@/utils/dateString';
import { ShuttleType } from '@/types/shuttle.types';

interface Props {
  shuttle: ShuttleType;
}

const DemandCard = ({ shuttle }: Props) => {
  const dates = shuttle.dailyShuttles.map((v) => new Date(v.date));

  return (
    <Link href={`/demand/${shuttle.shuttleId}`}>
      <div className="flex flex-row gap-16 px-16 py-12">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[80px] max-w-[80px] overflow-hidden rounded-[8px] bg-grey-50">
          <Image
            className="object-cover"
            src={shuttle.image}
            alt={`${shuttle.name}의 포스터`}
            fill
          />
        </div>
        <div className="flex h-[110px] flex-col gap-4 overflow-hidden">
          <div className="line-clamp-2 text-16 font-500 text-grey-900">
            {shuttle.name}
          </div>
          <div className="text-12 font-400">
            <div className="line-clamp-1 text-grey-900">
              {shuttle.destination.name}
            </div>
            <div className="line-clamp-1 text-grey-900">
              {dateString(dates)}
            </div>
            <div className="line-clamp-1 text-grey-500">
              {shuttle.participants.map((p) => p.name).join(', ')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DemandCard;
