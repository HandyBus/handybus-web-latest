import Image from 'next/image';

interface Props {
  artistDisplayName: string;
  artistSubDisplayName?: string | null;
  imageUrl?: string | null;
}

const ArtistHero = ({
  artistDisplayName,
  artistSubDisplayName,
  imageUrl,
}: Props) => {
  return (
    <div className="relative h-[279px] w-full bg-basic-grey-200">
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt={artistDisplayName}
            fill
            className="object-cover"
          />
          <div className="to-black/60 absolute inset-0 bg-gradient-to-b from-transparent" />
        </>
      )}
      <div className="absolute bottom-0 left-0 p-16">
        <h2 className="text-20 font-700 leading-[140%] text-basic-white">
          {artistDisplayName}
        </h2>
        {artistSubDisplayName && (
          <p className="text-14 font-500 leading-[160%] text-basic-grey-400">
            {artistSubDisplayName}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArtistHero;
