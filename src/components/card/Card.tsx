import Image from 'next/image';
import Badge from '../badge/Badge';
import Link from 'next/link';

const DEMAND_ONGOING_BADGE_CLASS_NAME =
  'inline-flex shrink-0 bg-basic-blue-100 leading-[160%] text-basic-blue-400';

interface Props {
  variant: 'LARGE' | 'MEDIUM' | 'SMALL';
  image: string | null;
  order?: number;
  isSaleStarted?: boolean;
  title?: string;
  date?: string;
  location?: string;
  price?: string;
  href?: string;
}

const Card = ({
  variant,
  image,
  order,
  isSaleStarted = true,
  title,
  date,
  location,
  price,
  href,
}: Props) => {
  if (variant === 'LARGE') {
    return (
      <LargeCard
        variant={variant}
        image={image}
        order={order}
        isSaleStarted={isSaleStarted}
        title={title}
        price={price}
        href={href}
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
        href={href}
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
      href={href}
    />
  );
};

export default Card;

const LargeCard = ({
  image,
  order = 1,
  isSaleStarted,
  title = 'ATEEZ 2024 FANMEETING 〈ATINY&apos;S VOYAGE FROM A TO Z〉',
  price = '32,000원~',
  href,
}: Props) => {
  return (
    <Link
      href={href || ''}
      className={`relative block h-[309px] w-[232px] shrink-0 rounded-[14px] border-[1px] border-[#181F29] border-opacity-[0.08]`}
    >
      <Image
        src={image || '/images/default-event.png'}
        alt="card"
        fill
        className={`rounded-[13px] object-cover`}
      />
      {order && (
        <div className="fixed left-0 right-0 flex items-center pl-[16px] pt-[5px] font-dmSans text-[40px] font-600 italic leading-[140%] text-basic-white text-shadow-order">
          {order}
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 flex h-136 w-full flex-col justify-end break-words rounded-b-12 bg-opacity-60 p-16 ">
        <div className="flex items-center pb-[6px]">
          {!isSaleStarted && (
            <Badge className={`${DEMAND_ONGOING_BADGE_CLASS_NAME}`}>
              수요조사 진행 중
            </Badge>
          )}
        </div>
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
    </Link>
  );
};

const MediumCard = ({
  image,
  isSaleStarted,
  title = 'ATEEZ 2024 FANMEETING 〈ATINY’S VOYAGE FROM A TO Z〉',
  date = '2024.02.01 - 02.03',
  price = '32,000원~',
  href,
}: Props) => {
  return (
    <Link href={href || ''} className="block w-[145px]">
      <div
        className={`relative h-[193px] w-[145px] shrink-0 rounded-8 border-[1px] border-[#181F29] border-opacity-[0.08]`}
      >
        <Image
          src={image || '/images/default-event.png'}
          alt="card"
          fill
          className={`rounded-[7px] object-cover`}
        />
      </div>
      <div className="py-12 pl-4 pr-12">
        <p className="line-clamp-2 break-all text-14 font-600 leading-[140%] text-basic-black">
          {title}
        </p>
        <p className="text-12 font-500 leading-[160%] text-basic-black ">
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
      </div>
    </Link>
  );
};

const SmallCard = ({
  image,
  isSaleStarted,
  title = 'ATEEZ 2024 FANMEETING 〈ATINY’S VOYAGE FROM A TO Z〉',
  date = '2024.02.01 - 02.03',
  location = '잠실실내체육관',
  price = '32,000원~',
  href,
}: Props) => {
  return (
    <Link href={href || ''} className="flex gap-12">
      <div
        className={`relative h-[133px] w-[100px] shrink-0 rounded-8 border-[1px] border-[#181F29] border-opacity-[0.08]`}
      >
        <Image
          src={image || '/images/default-event.png'}
          alt="card"
          fill
          className={`rounded-[7px] object-cover`}
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
    </Link>
  );
};
