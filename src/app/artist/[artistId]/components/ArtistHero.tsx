import Image from 'next/image';

interface Props {
  artistName: string;
  artistEnglishName?: string | null;
  imageUrl?: string | null;
}

const ArtistHero = ({ artistName, artistEnglishName, imageUrl }: Props) => {
  return (
    <div className="relative h-[279px] w-full bg-basic-grey-200">
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt={artistName}
            fill
            className="object-cover"
          />
          <div className="to-black/60 absolute inset-0 bg-gradient-to-b from-transparent" />
        </>
      )}
      <div className="absolute bottom-0 left-0 p-16">
        <h2 className="text-20 font-700 leading-[140%] text-basic-white">
          {artistName}
        </h2>
        {artistEnglishName && (
          <p className="text-14 font-500 leading-[160%] text-basic-grey-400">
            {artistEnglishName}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArtistHero;
