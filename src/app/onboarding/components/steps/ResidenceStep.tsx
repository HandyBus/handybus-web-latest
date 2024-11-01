import Button from '@/components/Button';
import Indicator from '@/components/Indicator';
import Select from '@/components/Select';

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const ResidenceStep = ({ handleNextStep, handlePrevStep }: Props) => {
  return (
    <div className="relative h-full w-full grow">
      <div className="p-28 text-26 font-700 text-grey-900">
        <h2 className="pb-[6px] text-26 font-700 text-grey-900">
          어디에 거주하고 계세요?
        </h2>
        <p className="text-14 font-600 text-grey-500">
          해당 지역의 셔틀 정보를 먼저 알려드릴게요.
        </p>
      </div>
      <div className="flex flex-col gap-16 p-28">
        <div className="text-16 font-500 text-grey-600-sub">
          거주 지역을 선택해주세요
        </div>
        <Select
          options={[{ label: '서울특별시', value: '서울특별시' }]}
          placeholder="도/광역시"
        />
        <Select
          options={[{ label: '서울특별시', value: '서울특별시' }]}
          placeholder="시/군/구"
        />
      </div>
      <div className="absolute bottom-12 flex w-full flex-col items-center bg-white">
        <div className="py-16">
          <Indicator max={4} value={3} />
        </div>
        <div className="w-full px-32 pb-4 pt-8">
          <Button type="button" onClick={handleNextStep}>
            다음으로
          </Button>
        </div>
        <button
          type="button"
          onClick={handlePrevStep}
          className="text-center text-12 text-grey-400 underline underline-offset-2"
        >
          이전으로
        </button>
      </div>
    </div>
  );
};

export default ResidenceStep;
