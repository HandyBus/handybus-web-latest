import Image from 'next/image';
import Badge from '../badge/Badge';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const DEMAND_ONGOING_BADGE_CLASS_NAME =
  'inline-flex shrink-0 bg-basic-blue-100 leading-[160%] text-basic-blue-400';
const BOOKING_CLOSING_SOON_BADGE_CLASS_NAME =
  'inline-flex shrink-0 bg-basic-red-100 leading-[160%] text-basic-red-400';

interface Props {
  variant: 'GRID' | 'LARGE' | 'MEDIUM' | 'SMALL';
  image: string | null;
  order?: number;
  isSaleStarted?: boolean;
  isReservationClosingSoon?: boolean;
  title?: string;
  date?: string;
  location?: string;
  price?: string;
  href?: string;
  priority?: boolean;
  fadeIn?: boolean;
}

const Card = ({
  variant,
  image,
  order,
  isSaleStarted = true,
  isReservationClosingSoon,
  title,
  date,
  location,
  price,
  href,
  priority,
  fadeIn,
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
        href={href}
        priority={priority}
        fadeIn={fadeIn}
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
        href={href}
        fadeIn={fadeIn}
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
        fadeIn={fadeIn}
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
      fadeIn={fadeIn}
    />
  );
};

export default Card;

const GridCard = ({
  image,
  isSaleStarted,
  isReservationClosingSoon,
  title,
  date,
  price,
  href,
  priority,
  fadeIn,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(fadeIn);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // 이미지 src가 변경되면 fade-in 상태 리셋
    if (!isInitialMount.current) {
      setIsImageLoaded(false);
      setShouldFadeIn(true);
      return;
    }

    // 초기 마운트 시에만 이미지 로딩 상태 확인
    isInitialMount.current = false;

    const checkImageLoaded = () => {
      if (imageRef.current) {
        const imgElement = imageRef.current.querySelector('img');
        if (imgElement) {
          if (imgElement.complete) {
            // 이미지가 이미 로드되어 있으면 fade-in 건너뛰기
            setIsImageLoaded(true);
            setShouldFadeIn(false);
          } else {
            // 이미지가 아직 로드되지 않았으면 fade-in 적용
            setIsImageLoaded(false);
            setShouldFadeIn(true);
          }
        } else {
          // 이미지 요소가 아직 DOM에 없으면 기본적으로 fade-in 적용
          setIsImageLoaded(false);
          setShouldFadeIn(true);
        }
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(checkImageLoaded);
    });
  }, [image, fadeIn]);

  const handleImageLoad = () => {
    if (shouldFadeIn) {
      setIsImageLoaded(true);
    }
  };

  const imageClassName = shouldFadeIn
    ? `rounded-[7px] object-cover transition-opacity duration-300 ease-in-out ${
        isImageLoaded ? 'opacity-100' : 'opacity-0'
      }`
    : 'rounded-[7px] object-cover';

  return (
    <Link href={href || ''} className="block w-full">
      <div
        ref={imageRef}
        className={`relative aspect-[165/220] w-full shrink-0 rounded-8 border-[1px] border-[#181F29] border-opacity-[0.08]`}
      >
        <Image
          src={image || '/images/default-event.png'}
          alt={`${title} 행사 셔틀 보러가기`}
          fill
          priority={priority}
          className={imageClassName}
          onLoad={shouldFadeIn ? handleImageLoad : undefined}
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
    </Link>
  );
};

const LargeCard = ({
  image,
  order,
  isSaleStarted,
  title,
  price,
  href,
  fadeIn,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(fadeIn);
  const imageRef = useRef<HTMLAnchorElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // 이미지 src가 변경되면 fade-in 상태 리셋
    if (!isInitialMount.current) {
      setIsImageLoaded(false);
      setShouldFadeIn(true);
      return;
    }

    // 초기 마운트 시에만 이미지 로딩 상태 확인
    isInitialMount.current = false;

    const checkImageLoaded = () => {
      if (imageRef.current) {
        const imgElement = imageRef.current.querySelector('img');
        if (imgElement) {
          if (imgElement.complete) {
            // 이미지가 이미 로드되어 있으면 fade-in 건너뛰기
            setIsImageLoaded(true);
            setShouldFadeIn(false);
          } else {
            // 이미지가 아직 로드되지 않았으면 fade-in 적용
            setIsImageLoaded(false);
            setShouldFadeIn(true);
          }
        } else {
          // 이미지 요소가 아직 DOM에 없으면 기본적으로 fade-in 적용
          setIsImageLoaded(false);
          setShouldFadeIn(true);
        }
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(checkImageLoaded);
    });
  }, [image, fadeIn]);

  const handleImageLoad = () => {
    if (shouldFadeIn) {
      setIsImageLoaded(true);
    }
  };

  const orderColorClass =
    order === 1
      ? 'ml-[-5px]'
      : order === 2
        ? 'ml-[-4px]'
        : order === 3
          ? 'ml-[-5px]'
          : '';

  const imageClassName = shouldFadeIn
    ? `rounded-[13px] object-cover transition-opacity duration-300 ease-in-out ${
        isImageLoaded ? 'opacity-100' : 'opacity-0'
      }`
    : 'rounded-[13px] object-cover';

  return (
    <Link
      ref={imageRef}
      href={href || ''}
      className={`relative block h-[309px] w-[232px] shrink-0 rounded-[14px] border-[1px] border-[#181F29] border-opacity-[0.08]`}
    >
      <Image
        src={image || '/images/default-event.png'}
        alt={`${title} 행사 셔틀 보러가기`}
        fill
        className={imageClassName}
        onLoad={shouldFadeIn ? handleImageLoad : undefined}
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
          backdropFilter: 'blur(2.5px)',
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
    </Link>
  );
};

const MediumCard = ({
  image,
  isSaleStarted,
  isReservationClosingSoon,
  title,
  date,
  price,
  href,
  fadeIn,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(fadeIn);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // 이미지 src가 변경되면 fade-in 상태 리셋
    if (!isInitialMount.current) {
      setIsImageLoaded(false);
      setShouldFadeIn(true);
      return;
    }

    // 초기 마운트 시에만 이미지 로딩 상태 확인
    isInitialMount.current = false;

    const checkImageLoaded = () => {
      if (imageRef.current) {
        const imgElement = imageRef.current.querySelector('img');
        if (imgElement) {
          if (imgElement.complete) {
            // 이미지가 이미 로드되어 있으면 fade-in 건너뛰기
            setIsImageLoaded(true);
            setShouldFadeIn(false);
          } else {
            // 이미지가 아직 로드되지 않았으면 fade-in 적용
            setIsImageLoaded(false);
            setShouldFadeIn(true);
          }
        } else {
          // 이미지 요소가 아직 DOM에 없으면 기본적으로 fade-in 적용
          setIsImageLoaded(false);
          setShouldFadeIn(true);
        }
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(checkImageLoaded);
    });
  }, [image, fadeIn]);

  const handleImageLoad = () => {
    if (shouldFadeIn) {
      setIsImageLoaded(true);
    }
  };

  const imageClassName = shouldFadeIn
    ? `rounded-[7px] object-cover transition-opacity duration-300 ease-in-out ${
        isImageLoaded ? 'opacity-100' : 'opacity-0'
      }`
    : 'rounded-[7px] object-cover';

  return (
    <Link href={href || ''} className="block w-[145px]">
      <div
        ref={imageRef}
        className={`relative h-[193px] w-[145px] shrink-0 rounded-8 border-[1px] border-[#181F29] border-opacity-[0.08]`}
      >
        <Image
          src={image || '/images/default-event.png'}
          alt={`${title} 행사 셔틀 보러가기`}
          fill
          className={imageClassName}
          onLoad={shouldFadeIn ? handleImageLoad : undefined}
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
    </Link>
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
  href,
  fadeIn,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(fadeIn);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // 이미지 src가 변경되면 fade-in 상태 리셋
    if (!isInitialMount.current) {
      setIsImageLoaded(false);
      setShouldFadeIn(true);
      return;
    }

    // 초기 마운트 시에만 이미지 로딩 상태 확인
    isInitialMount.current = false;

    const checkImageLoaded = () => {
      if (imageRef.current) {
        const imgElement = imageRef.current.querySelector('img');
        if (imgElement) {
          if (imgElement.complete) {
            // 이미지가 이미 로드되어 있으면 fade-in 건너뛰기
            setIsImageLoaded(true);
            setShouldFadeIn(false);
          } else {
            // 이미지가 아직 로드되지 않았으면 fade-in 적용
            setIsImageLoaded(false);
            setShouldFadeIn(true);
          }
        } else {
          // 이미지 요소가 아직 DOM에 없으면 기본적으로 fade-in 적용
          setIsImageLoaded(false);
          setShouldFadeIn(true);
        }
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(checkImageLoaded);
    });
  }, [image, fadeIn]);

  const handleImageLoad = () => {
    if (shouldFadeIn) {
      setIsImageLoaded(true);
    }
  };

  const imageClassName = shouldFadeIn
    ? `rounded-[7px] object-cover transition-opacity duration-300 ease-in-out ${
        isImageLoaded ? 'opacity-100' : 'opacity-0'
      }`
    : 'rounded-[7px] object-cover';

  return (
    <Link href={href || ''} className="flex gap-12">
      <div
        ref={imageRef}
        className={`relative h-[133px] w-[100px] shrink-0 rounded-8 border-[1px] border-[#181F29] border-opacity-[0.08]`}
      >
        <Image
          src={image || '/images/default-event.png'}
          alt={`${title} 행사 셔틀 보러가기`}
          fill
          className={imageClassName}
          onLoad={shouldFadeIn ? handleImageLoad : undefined}
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
