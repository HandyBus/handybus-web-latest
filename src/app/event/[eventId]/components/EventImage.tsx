import Image from 'next/image';

interface Props {
  eventImageUrl: string | null;
  eventName: string;
}

const EventImage = ({ eventImageUrl, eventName }: Props) => {
  return (
    <section className="relative aspect-[375/500] w-full">
      <Image
        src={eventImageUrl ?? ''}
        alt={eventName}
        fill
        priority
        className="object-cover"
      />
    </section>
  );
};

export default EventImage;
