import Image from 'next/image';
import Badge from '../badge/Badge';

const DEMAND_ONGOING_BADGE_CLASS_NAME =
  'inline-flex shrink-0 bg-basic-blue-100 leading-[160%] text-basic-blue-400';
const BOOKING_CLOSING_SOON_BADGE_CLASS_NAME =
  'inline-flex shrink-0 bg-basic-red-100 leading-[160%] text-basic-red-400';

interface Props {
  variant: 'GRID' | 'LARGE' | 'MEDIUM' | 'SMALL';
  image: string | null;
  onClick: () => void;
  order?: number;
  isSaleStarted?: boolean;
  isReservationClosingSoon?: boolean;
  title?: string;
  date?: string;
  location?: string;
  price?: string;
  priority?: boolean;
}

const Card = ({
  variant,
  image,
  onClick,
  order,
  isSaleStarted = true,
  isReservationClosingSoon,
  title,
  date,
  location,
  price,
  priority,
}: Props) => {
  if (variant === 'GRID') {
    return (
      <GridCard
        variant={variant}
        image={image}
        isSaleStarted={isSaleStarted}
        isReservationClosingSoon={isReservationClosingSoon}
        title={title}
        date={date}
        price={price}
        location={location}
        onClick={onClick}
        priority={priority}
      />
    );
  }
  if (variant === 'LARGE') {
    return (
      <LargeCard
        variant={variant}
        image={image}
        order={order}
        isSaleStarted={isSaleStarted}
        title={title}
        price={price}
        onClick={onClick}
        priority={priority}
      />
    );
  }
  if (variant === 'MEDIUM') {
    return (
      <MediumCard
        variant={variant}
        image={image}
        isSaleStarted={isSaleStarted}
        title={title}
        date={date}
        price={price}
        location={location}
        onClick={onClick}
        priority={priority}
      />
    );
  }
  return (
    <SmallCard
      variant={variant}
      image={image}
      isSaleStarted={isSaleStarted}
      title={title}
      date={date}
      location={location}
      price={price}
      onClick={onClick}
      priority={priority}
    />
  );
};

export default Card;

const GridCard = ({
  image,
  onClick,
  isSaleStarted,
  isReservationClosingSoon,
  title,
  date,
  price,
  priority,
}: Props) => {
  return (
    <button type="button" onClick={onClick} className="block w-full text-left">
      <div className="relative aspect-[165/220] w-full shrink-0 rounded-8 border-[1px] border-[#181F29] border-opacity-[0.08]">
        <Image
          src={image || '/images/default-event.png'}
          alt={`${title} 행사 셔틀 보러가기`}
          fill
          priority={priority}
          className="rounded-[7px] object-cover"
        />
        {!isSaleStarted && (
          <Badge
            className={`absolute right-12 top-12 ${DEMAND_ONGOING_BADGE_CLASS_NAME}`}
          >
            수요조사중
          </Badge>
        )}
        {isReservationClosingSoon && (
          <Badge
            className={`absolute right-12 top-12 ${BOOKING_CLOSING_SOON_BADGE_CLASS_NAME}`}
          >
            마감임박
          </Badge>
        )}
      </div>
      <div className="py-12 pl-4 pr-12">
        <p className="line-clamp-2 break-all text-14 font-600 leading-[140%] text-basic-black">
          {title}
        </p>
        <p className="text-12 font-500 leading-[160%] text-basic-grey-500 ">
          {date}
        </p>
        <p
          className={`text-14 font-600 leading-[140%] ${
            isSaleStarted ? 'text-basic-black' : 'text-basic-grey-500'
          }`}
        >
          {isSaleStarted ? price : '판매대기'}
        </p>
      </div>
    </button>
  );
};

const LargeCard = ({
  image,
  order,
  isSaleStarted,
  title,
  price,
  onClick,
  priority,
}: Props) => {
  const orderColorClass =
    order === 1
      ? 'ml-[-5px]'
      : order === 2
        ? 'ml-[-4px]'
        : order === 3
          ? 'ml-[-5px]'
          : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative block h-[309px] w-[232px] shrink-0 rounded-[14px] border-[1px] border-[#181F29] border-opacity-[0.08] text-left"
    >
      <Image
        src={image || '/images/default-event.png'}
        alt={`${title} 행사 셔틀 보러가기`}
        fill
        priority={priority}
        className="rounded-[13px] object-cover"
      />
      {order && (
        <div
          className={`absolute left-0 right-0 flex items-center pl-[16px] pt-[5px] font-dmSans text-[40px] font-600 italic leading-[140%] text-basic-white text-shadow-order ${orderColorClass}`}
        >
          {order}
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 flex h-136 w-full flex-col justify-end break-words rounded-b-12 p-16"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 9.23%, rgba(0, 0, 0, 0.60) 80.82%)',
          backdropFilter: 'blur(1px)',
        }}
      >
        <p className="line-clamp-2 break-all text-18 font-600 leading-[140%] text-basic-white">
          {title}
        </p>
        <div className="mt-[2px] flex items-center gap-4">
          <p
            className={`text-16 font-600 leading-[140%] 
            text-basic-white`}
          >
            {isSaleStarted ? price : '판매대기'}
          </p>
        </div>
      </div>
    </button>
  );
};

const MediumCard = ({
  image,
  isSaleStarted,
  isReservationClosingSoon,
  title,
  date,
  price,
  onClick,
  priority,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-[145px] text-left"
    >
      <div className="relative h-[193px] w-[145px] shrink-0 rounded-8 border-[1px] border-[#181F29] border-opacity-[0.08]">
        <Image
          src={image || '/images/default-event.png'}
          alt={`${title} 행사 셔틀 보러가기`}
          fill
          priority={priority}
          className="rounded-[7px] object-cover"
        />
      </div>
      <div className="py-12 pl-4 pr-12">
        <p className="line-clamp-2 break-all text-14 font-600 leading-[140%] text-basic-black">
          {title}
        </p>
        <p className="text-12 font-500 leading-[160%] text-basic-grey-500 ">
          {date}
        </p>
        <p
          className={`text-14 font-600 leading-[140%] ${
            isSaleStarted ? 'text-basic-black' : 'text-basic-grey-500'
          }`}
        >
          {isSaleStarted ? price : '판매대기'}
        </p>
        {!isSaleStarted && (
          <Badge className={`mt-4 ${DEMAND_ONGOING_BADGE_CLASS_NAME}`}>
            수요조사 진행 중
          </Badge>
        )}
        {isReservationClosingSoon && (
          <Badge className={`mt-4 ${BOOKING_CLOSING_SOON_BADGE_CLASS_NAME}`}>
            마감임박
          </Badge>
        )}
      </div>
    </button>
  );
};

// deprecated: 모든 행사페이지에서 GridCard로 대체됨
const SmallCard = ({
  image,
  isSaleStarted,
  title,
  date,
  location,
  price,
  onClick,
  priority,
}: Props) => {
  return (
    <button type="button" onClick={onClick} className="flex gap-12 text-left">
      <div className="relative h-[133px] w-[100px] shrink-0 rounded-8 border-[1px] border-[#181F29] border-opacity-[0.08]">
        <Image
          src={image || '/images/default-event.png'}
          alt={`${title} 행사 셔틀 보러가기`}
          fill
          priority={priority}
          className="rounded-[7px] object-cover"
        />
      </div>
      <div>
        {!isSaleStarted && (
          <Badge className={`mb-4 ${DEMAND_ONGOING_BADGE_CLASS_NAME}`}>
            수요조사 진행 중
          </Badge>
        )}
        <p className="line-clamp-2 break-all text-14 font-600 leading-[140%] text-basic-black ">
          {title}
        </p>
        <p className="text-12 font-500 leading-[160%] text-basic-black">
          {date}
        </p>
        <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
          {location}
        </p>
        <p
          className={`text-14 font-600 leading-[140%] ${
            isSaleStarted ? 'text-basic-black' : 'text-basic-grey-500'
          }`}
        >
          {isSaleStarted ? price : '판매대기'}
        </p>
      </div>
    </button>
  );
};
