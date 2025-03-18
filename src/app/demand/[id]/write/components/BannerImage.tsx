import Image from 'next/image';
import GroupIcon from 'public/icons/group.svg';
import BxIcon from 'public/icons/bx-map.svg';
import { EventsViewEntity } from '@/types/event.type';

interface Props {
  event: EventsViewEntity;
}

const BannerImage = ({ event }: Props) => {
  return (
    <figure className="relative m-16 h-[150px] overflow-hidden rounded-[10px] p-20">
      <Image
        src={event.eventImageUrl || '/images/concert-sample.png'} // NOTES: temporary image
        alt="event banner image"
        className="absolute rounded-[10px] object-cover"
        fill
      />
      <div className="absolute inset-0 bg-basic-black/70" />

      <figcaption className="absolute  flex flex-col gap-[12px]">
        <h2 className="line-clamp-2 text-18 font-700 leading-[25.2px] text-basic-white">
          {event.eventName}
        </h2>
        <div className="flex flex-col gap-[5px] text-12 font-400 leading-[14.32px] text-brand-grey-200">
          <p className="flex gap-[2px]">
            <span>
              <GroupIcon aria-hidden="true" />
            </span>
            <span className="line-clamp-2 ">
              {event.eventArtists?.map((v) => v.artistName).join(', ')}
            </span>
          </p>
          <p className="flex gap-[2px]">
            <span>
              <BxIcon aria-hidden="true" />
            </span>
            <span className="line-clamp-1">{event.eventLocationName}</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
};

export default BannerImage;
