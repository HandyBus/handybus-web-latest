import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import Image from 'next/image';

interface Props {
  image: string | null;
}

const EventImage = ({ image }: Props) => {
  return (
    <article className="relative">
      <Image
        src={image || DEFAULT_EVENT_IMAGE}
        alt="행사 이미지"
        width={1080}
        height={720}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-basic-white via-basic-white/80 to-transparent" />
    </article>
  );
};

export default EventImage;
