import Image from 'next/image';
import Link from 'next/link';
import { ArtistsViewEntity } from '@/types/artist.type';

interface Props {
  artists: ArtistsViewEntity[];
}

const ArtistGrid = ({ artists }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-x-[10px] gap-y-16 pt-16">
      {artists.map((artist) => (
        <Link
          key={artist.artistId}
          href={`/artist/${artist.artistId}`}
          className="flex flex-col items-center gap-8"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-8 bg-basic-black/[0.08]">
            {artist.artistMainImageUrl && (
              <Image
                src={artist.artistMainImageUrl}
                alt={artist.artistAbbreviatedName ?? artist.artistDisplayName}
                fill
                className="object-cover"
              />
            )}
          </div>
          <span className="line-clamp-2 w-full text-center text-14 font-600 leading-[140%]">
            {artist.artistAbbreviatedName ?? artist.artistDisplayName}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ArtistGrid;
