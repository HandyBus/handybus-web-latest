import Image from 'next/image';

interface Props {
  eventImageUrl: string | null;
  eventName: string;
}

const EventImage = ({ eventImageUrl, eventName }: Props) => {
  return (
    <section className="relative aspect-square w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={eventImageUrl ?? ''}
          alt={eventName}
          fill
          priority
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
  );
};

export default EventImage;
