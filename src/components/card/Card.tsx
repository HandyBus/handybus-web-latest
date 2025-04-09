import Image from 'next/image';
import Badge from '../badge/Badge';

const CARD_SIZE = {
  LARGE: 'w-[232px] h-[309px]',
  MEDIUM: 'w-[145px] h-[193px]',
  SMALL: 'w-[100px] h-[133px]',
} as const;

const CARD_ROUNDED = {
  LARGE: 'rounded-[14px]',
  MEDIUM: 'rounded-8',
  SMALL: 'rounded-8',
} as const;

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
    />
  );
};

export default Card;

const LargeCard = ({
  variant,
  image,
  order = 1,
  isSaleStarted,
  title = 'ATEEZ 2024 FANMEETING 〈ATINY&apos;S VOYAGE FROM A TO Z〉',
  price = '32,000원~',
}: Props) => {
  return (
    <div
      className={`${CARD_SIZE[variant]} relative shrink-0 border-[1px] border-[#181F29] border-opacity-[0.08] ${CARD_ROUNDED[variant]}`}
    >
      <Image
        src={image || '/images/default-event.png'}
        alt="card"
        fill
        className={`object-cover ${CARD_ROUNDED[variant]}`}
      />
      {variant === 'LARGE' && (
        <>
          {order && (
            <div className="absolute left-0 right-0 flex h-[50px] w-[43px] items-center  justify-center rounded-br-12 rounded-tl-12 bg-[#00C896CC] text-20 font-700 leading-[140%] text-basic-white">
              {order}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-108 w-full break-words rounded-b-12  bg-[#181F29] bg-opacity-60 p-16 ">
            <p className="line-clamp-2 break-all text-18 font-600 leading-[140%] text-basic-white">
              {title}
            </p>
            <div className="mt-[2px] flex items-center gap-4">
              <p
                className={`text-16 font-600 leading-[140%] ${
                  isSaleStarted ? 'text-basic-white' : 'text-basic-grey-300'
                }`}
              >
                {isSaleStarted ? price : '판매대기'}
              </p>
              {!isSaleStarted && (
                <Badge className={`${DEMAND_ONGOING_BADGE_CLASS_NAME}`}>
                  수요조사 진행 중
                </Badge>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const MediumCard = ({
  variant,
  image,
  isSaleStarted,
  title = 'ATEEZ 2024 FANMEETING 〈ATINY’S VOYAGE FROM A TO Z〉',
  date = '2024.02.01 - 02.03',
  price = '32,000원~',
}: Props) => {
  return (
    <div className=" w-[145px]">
      <div
        className={`${CARD_SIZE[variant]} relative shrink-0 border-[1px] border-[#181F29] border-opacity-[0.08] ${CARD_ROUNDED[variant]}`}
      >
        <Image
          src={image || '/images/default-event.png'}
          alt="card"
          fill
          className={`object-cover ${CARD_ROUNDED[variant]}`}
        />
      </div>
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
  );
};

const SmallCard = ({
  variant,
  image,
  isSaleStarted,
  title = 'ATEEZ 2024 FANMEETING 〈ATINY’S VOYAGE FROM A TO Z〉',
  date = '2024.02.01 - 02.03',
  location = '잠실실내체육관',
  price = '32,000원~',
}: Props) => {
  return (
    <div className="flex gap-12">
      <div
        className={`${CARD_SIZE[variant]} relative shrink-0 border-[1px] border-[#181F29] border-opacity-[0.08] ${CARD_ROUNDED[variant]}`}
      >
        <Image
          src={image || '/images/default-event.png'}
          alt="card"
          fill
          className={`object-cover ${CARD_ROUNDED[variant]}`}
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
    </div>
  );
};
