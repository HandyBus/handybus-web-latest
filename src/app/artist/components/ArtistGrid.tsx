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
          <div className="aspect-square w-full rounded-8 bg-basic-black/[0.08]" />
          <span className="line-clamp-2 w-full text-center text-14 font-600 leading-[140%]">
            {artist.artistAbbreviatedName ?? artist.artistDisplayName}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ArtistGrid;
