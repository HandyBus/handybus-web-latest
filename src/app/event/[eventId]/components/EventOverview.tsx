import Image from 'next/image';
import OverviewImage from './images/event-overview.png';
import OngoingDemandPeriodImage from './images/ongoing-demand-period.png';
import Link from 'next/link';
import ArrowForwardIcon from '../icons/arrow-forward.svg';
import { getPhaseAndEnabledStatus } from '@/utils/event.util';
import { EventsViewEntity } from '@/types/event.type';

interface Props {
  event: EventsViewEntity;
  eventDetailImageUrl: string | null;
}

const EventOverview = ({ event, eventDetailImageUrl }: Props) => {
  const { phase } = getPhaseAndEnabledStatus(event);
  return (
    <section className="relative w-full">
      <div className="relative w-full">
        {phase === 'demand' && (
          <Image
            src={OngoingDemandPeriodImage}
            alt="수요조사 기간 안내 이미지"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        )}
        <Image
          src={eventDetailImageUrl || OverviewImage}
          alt="행사 상세 이미지"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="flex flex-col justify-center bg-basic-grey-50 px-32 pb-44">
        <Link
          href="/help/handybus-guide"
          className="flex h-[46px] items-center justify-center gap-[10px] rounded-[8px] text-16 font-600 leading-[160%] text-basic-grey-700"
        >
          이용방법 알아보기 <ArrowForwardIcon />
        </Link>
        <Link
          href="/help/faq"
          className="flex h-[46px] items-center justify-center gap-[10px] rounded-[8px] text-16 font-600 leading-[160%] text-basic-grey-700"
        >
          자주 묻는 질문 <ArrowForwardIcon />
        </Link>
      </div>
    </section>
  );
};

export default EventOverview;
