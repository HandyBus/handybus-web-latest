import Image from 'next/image';

const cardSize = {
  LARGE: 'w-[232px] h-[309px]',
  MEDIUM: 'w-[145px] h-[193px]',
  SMALL: 'w-[100px] h-[133px]',
} as const;

const cardRounded = {
  LARGE: 'rounded-[14px]',
  MEDIUM: 'rounded-8',
  SMALL: 'rounded-8',
} as const;

interface Props {
  variant: 'LARGE' | 'MEDIUM' | 'SMALL';
  image: string | null;
  order?: number;
  isSaleStarted?: boolean;
  isDemandStarted?: boolean;
}

const Card = ({
  variant,
  image,
  order = 1,
  isSaleStarted = true,
  isDemandStarted = true,
}: Props) => {
  return (
    <div
      className={`${cardSize[variant]} relative border-[1px] border-[#181F29] border-opacity-[0.08] ${cardRounded[variant]}`}
    >
      <Image
        src={image || '/images/default-event.png'}
        alt="card"
        fill
        className={`object-cover ${cardRounded[variant]}`}
      />
      {variant === 'LARGE' && (
        <>
          {order && (
            <div className="absolute left-0 right-0 flex h-[50px] w-[43px] items-center  justify-center rounded-br-12 rounded-tl-12 bg-[#00C896CC] text-20 font-700 leading-[140%] text-basic-white">
              {order}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-108 w-full break-words rounded-b-12  bg-[#181F29] bg-opacity-60 p-16 ">
            <p className="line-clamp-2 overflow-hidden text-18 font-600 leading-[140%] text-basic-white">
              ATEEZ 2024 FANMEETING 〈ATINY&apos;S VOYAGE FROM A TO Z〉
            </p>
            <div className="flex items-center gap-4">
              <p
                className={`text-16 font-600 leading-[140%] ${
                  isSaleStarted ? 'text-basic-white' : 'text-basic-grey-300'
                }`}
              >
                {isSaleStarted ? '32,000원~' : '판매대기'}
              </p>
              {isDemandStarted && (
                <div className="rounded-[42px] bg-basic-blue-100 px-8 py-4 text-10 font-600 leading-[160%] text-basic-blue-400">
                  수요조사 진행 중
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
