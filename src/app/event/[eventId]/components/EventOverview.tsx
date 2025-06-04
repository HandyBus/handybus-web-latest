import Image from 'next/image';
import overviewImage from './images/event-overview.png';
import Link from 'next/link';
import ArrowForwardIcon from '../icons/arrow-forward.svg';

const EventOverview = () => {
  return (
    <section>
      <Image src={overviewImage} alt="event overview" />
      <div className="flex justify-center bg-basic-grey-50 px-32 pb-64">
        <Link
          href="/help/handybus-guide"
          className="flex h-[46px] w-[calc(100%-32px)] items-center justify-center gap-[10px] rounded-[8px] text-16 font-600 leading-[160%] text-basic-grey-700 "
        >
          자세히 알아보기 <ArrowForwardIcon />
        </Link>
      </div>
    </section>
  );
};

export default EventOverview;
