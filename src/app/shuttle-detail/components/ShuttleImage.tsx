import Image from 'next/image';
import QuillChveronRight from 'public/icons/quill-chevron-right.svg';

const ShuttleImage = () => {
  return (
    <article className="relative">
      <nav>
        <button aria-label="route back">
          <QuillChveronRight className="absolute left-16 top-16 h-32 w-32 rotate-180 [&>path]:stroke-white" />
        </button>
      </nav>
      <Image
        // src="/concert-sample2.webp"
        src="/concert-sample.png"
        alt="shuttle-info-image"
        width={1080}
        height={720}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-white via-white/80 to-transparent" />
    </article>
  );
};

export default ShuttleImage;
