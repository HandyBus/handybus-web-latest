import Image from 'next/image';

const ShuttleImage = () => {
  return (
    <article className="relative">
      <Image
        src="/images/concert-sample.png"
        alt="shuttle-info-image"
        width={1080}
        height={720}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-white via-white/80 to-transparent" />
    </article>
  );
};

export default ShuttleImage;
