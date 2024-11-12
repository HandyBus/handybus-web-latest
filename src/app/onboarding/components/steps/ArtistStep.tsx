'use client';

import Button from '@/components/buttons/button/Button';
import Indicator from '@/components/indicator/Indicator';
import ArtistContent from '@/components/onboarding-contents/ArtistContent';

interface Props {
  handlePrevStep: () => void;
  isLoading: boolean;
}

const ArtistStep = ({ handlePrevStep, isLoading }: Props) => {
  return (
    <>
      <ArtistContent />
      <div className="absolute bottom-12 flex w-full flex-col items-center bg-white">
        <div className="py-16">
          <Indicator max={4} value={4} />
        </div>
        <div className="w-full px-32 pb-4 pt-8">
          <Button type="submit" disabled={isLoading}>
            핸디버스 만나러 가기
          </Button>
        </div>
        <button
          type="button"
          onClick={handlePrevStep}
          disabled={isLoading}
          className="text-center text-12 text-grey-400 underline underline-offset-2"
        >
          이전으로
        </button>
      </div>
    </>
  );
};

export default ArtistStep;
