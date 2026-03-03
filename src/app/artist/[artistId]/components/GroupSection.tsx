import Link from 'next/link';
import { ArtistsInArtistViewEntity } from '@/types/artist.type';

interface Props {
  groups: ArtistsInArtistViewEntity[];
}

const GroupSection = ({ groups }: Props) => {
  return (
    <section className="px-16 py-24">
      <h3 className="pb-16 text-18 font-600 leading-[140%]">그룹</h3>
      <div className="flex gap-8">
        {groups.map((group) => (
          <Link
            key={group.artistId}
            href={`/artist/${group.artistId}`}
            className="flex w-[80px] flex-col items-center gap-4"
          >
            <div className="aspect-square w-[80px] rounded-8 bg-basic-grey-100" />
            <span className="w-full truncate text-center text-12 font-500 text-basic-grey-700">
              {group.artistName}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GroupSection;
