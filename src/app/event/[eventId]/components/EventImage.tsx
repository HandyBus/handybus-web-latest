import Image from 'next/image';

interface Props {
  eventImageUrl: string | null;
  eventName: string;
}

const EventImage = ({ eventImageUrl, eventName }: Props) => {
  return (
    <>
      <section className="relative aspect-square w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={eventImageUrl ?? ''}
            alt={eventName}
            fill
            quality={5}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-basic-white/[0.01] backdrop-blur-[18px]" />
        <Image
          src={eventImageUrl ?? ''}
          alt={eventName}
          fill
          priority
          className="object-contain"
        />
      </section>
      <div className="flex h-[38px] items-center justify-center bg-basic-black text-14 font-600 text-basic-white">
        🤑 수요조사 참여 시 1,000원 할인 쿠폰 증정 🤑
      </div>
    </>
  );
};

export default EventImage;
