import ArtistSwiperView from './components/ArtistSwiperView';
import CardSection from '@/app/(home)/@event/components/CardSection';

const MOCK_ARTISTS = [
  {
    artistId: '6',
    artistName: '투모로우바이투게더',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '1',
    artistName: 'aespa',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: 'full',
    artistName: 'BLACKPINK',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '4',
    artistName: 'SEVENTEEN',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '7',
    artistName: 'BTS',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
];

const Page = () => {
  return (
    <section>
      <CardSection richTitle="아티스트" showMore="/artist">
        <ArtistSwiperView artists={MOCK_ARTISTS} />
      </CardSection>
    </section>
  );
};

export default Page;
