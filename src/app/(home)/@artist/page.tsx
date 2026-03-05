import ArtistSwiperView from './components/ArtistSwiperView';
import CardSection from '@/app/(home)/@event/components/CardSection';
import { getArtists } from '@/services/artist.service';

const Page = async () => {
  const { artists } = await getArtists({ limit: 10 });

  return (
    <section>
      <CardSection richTitle="아티스트" showMore="/artist">
        <ArtistSwiperView artists={artists} />
      </CardSection>
    </section>
  );
};

export default Page;
