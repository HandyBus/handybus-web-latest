import Image from 'next/image';

const IMAGE_URL = 'https://newsimg.sedaily.com/2024/06/28/2DAN45HOL1_1.jpg';

const EventInfoSection = () => {
  return (
    <section className="px-16 pb-24 pt-12">
      <h1 className="mb-24 text-22 font-700 leading-[140%]">예약 내역</h1>
      <div className="flex h-[114px] w-full gap-8">
        <div className="relative h-full w-[91px] shrink-0">
          <Image
            src={IMAGE_URL}
            alt="행사 포스터"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="line-clamp-2 text-16 font-600 leading-[140%]">
            2025 BTOB FAN-CON ‘3,2,1 GO! MELympic’
          </h3>
          <p className="flex flex-col gap-[2px]">
            <span className="line-clamp-1 text-12 font-500 leading-[160%] text-basic-grey-700">
              2025.03.21 - 03.23
            </span>
            <span className="line-clamp-1 text-14 font-500 leading-[160%] text-basic-grey-500">
              고양종합운동장
            </span>
          </p>
          <p className="text-16 font-600 leading-[140%]">32,000원~</p>
        </div>
      </div>
    </section>
  );
};

export default EventInfoSection;
