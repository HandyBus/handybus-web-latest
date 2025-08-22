import Image from 'next/image';
import OverviewImage from './images/event-overview.png';
import Link from 'next/link';
import ArrowForwardIcon from '../icons/arrow-forward.svg';
import FestivalLifeImage from './images/festival-life.png';

const FESTIVAL_LIFE_EVENT_ID = '599556266024506824';
export const MUSE_EVENT_ID = '612882322705879531';

interface Props {
  eventId: string;
  eventDetailImageUrl: string | null;
}

const EventOverview = ({ eventId, eventDetailImageUrl }: Props) => {
  const showFestivalLife = eventId === FESTIVAL_LIFE_EVENT_ID;

  return (
    <section className="relative w-full">
      {showFestivalLife && (
        <div className="relative w-full">
          <Image
            src={FestivalLifeImage}
            alt="행사 상세 이미지"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      )}
      <div className="relative w-full">
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
