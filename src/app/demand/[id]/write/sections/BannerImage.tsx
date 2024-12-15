import Image from 'next/image';
import GroupIcon from 'public/icons/group.svg';
import BxIcon from 'public/icons/bx-map.svg';

const BannerImage = () => {
  return (
    <figure className="relative m-16 h-[150px] overflow-hidden rounded-[10px] p-20">
      <Image
        src="/images/concert-sample.png"
        alt="event banner image"
        className="absolute rounded-[10px] object-cover"
        fill
      />
      <div className="absolute inset-0 bg-black/70" />

      <figcaption className="absolute  flex flex-col gap-[12px]">
        <h2 className="line-clamp-2 text-18 font-700 leading-[25.2px] text-white">
          ATEEZ 2024 FANMEETING 〈ATINY’S VOYAGE FROM A TO Z〉
        </h2>
        <div className="flex flex-col gap-[5px] text-12 font-400 leading-[14.32px] text-grey-200">
          <p className="flex gap-[2px]">
            <span>
              <GroupIcon aria-hidden="true" />
            </span>
            <span className="line-clamp-2 ">
              ATEEZ, 아이유, THE VOLUNTEERS, ATEEZ, 아이유, THE VOLUNTEERS,
              ATEEZ, 아이유, THE VOLUNTEERS
            </span>
          </p>
          <p className="flex gap-[2px]">
            <span>
              <BxIcon aria-hidden="true" />
            </span>
            <span className="line-clamp-1">잠실실내체육관</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
};

export default BannerImage;
