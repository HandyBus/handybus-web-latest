import { ShuttleRoute } from '@/types/shuttle.types';
import Image from 'next/image';

const ShuttleRouteView = ({ shuttleRoute }: { shuttleRoute: ShuttleRoute }) => {
  return (
    <div className="flex flex-row gap-16 px-16 py-12">
      <div className="relative max-h-[110px] min-h-[110px] min-w-[80px] max-w-[80px] overflow-hidden rounded-[8px] bg-grey-50">
        <Image
          className="object-cover"
          src={shuttleRoute.shuttle.image}
          alt={`콘서트 ${shuttleRoute.shuttle.image}의 포스터`}
          fill
        />
      </div>
      <div className="flex h-[110px] flex-col gap-4 overflow-hidden">
        <div className="line-clamp-1 text-16 font-500 text-grey-900">
          {shuttleRoute.shuttle.name}
        </div>
        <div className="text-12 font-400">
          <div className="line-clamp-1 text-grey-900">
            {shuttleRoute.shuttle.destination.name}
          </div>
          <div className="line-clamp-1 text-grey-900">
            {}
            2024. 08. 26. (월) 셔틀
          </div>
          <div className="line-clamp-1 text-grey-500">{shuttleRoute.name}</div>
        </div>
        <div className="line-clamp-1 text-14 font-500 text-grey-900">
          잔여석 <span className="text-primary-main">17석</span> / {28}석
        </div>
      </div>
    </div>
  );
};

export default ShuttleRouteView;
