import Tooltip from '@/components/tooltip/Tooltip';

interface Props {
  description: string | null;
}

const ArtistInfoSection = ({ description }: Props) => {
  return (
    <section className="px-16 py-24">
      <div className="flex items-center gap-4 pb-16">
        <h3 className="text-18 font-600 leading-[140%]">아티스트 정보</h3>
        <Tooltip content="정보 출처 기입 예정" position="bottom" />
      </div>
      {description ? (
        <p className="bg-basic-grey-50 p-12 text-14 font-400 leading-[160%] text-basic-grey-600">
          {description}
        </p>
      ) : (
        <p className="bg-basic-grey-50 p-12 text-14 font-500 leading-[160%] text-basic-grey-400">
          해당 아티스트 정보가 곧 추가될 예정이에요.
        </p>
      )}
    </section>
  );
};

export default ArtistInfoSection;
