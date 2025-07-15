import Image from 'next/image';
import OverviewImage from './images/event-overview.png';
import Link from 'next/link';
import ArrowForwardIcon from '../icons/arrow-forward.svg';
import FestivalLifeImage from './images/festival-life.png';

const FESTIVAL_LIFE_EVENT_ID = '599556266024506824';

interface Props {
  eventId: string;
}

const EventOverview = ({ eventId }: Props) => {
  const showFestivalLife = eventId === FESTIVAL_LIFE_EVENT_ID;

  return (
    <section>
      {showFestivalLife && (
        <Image src={FestivalLifeImage} alt="festival life" />
      )}
      <Image src={OverviewImage} alt="event overview" />
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
