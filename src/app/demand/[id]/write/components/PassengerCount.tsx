import Counter from '@/components/counter/Counter';

interface Props {
  count: number;
  setCount: (value: number) => void;
}

const PassengerCount = ({ count, setCount }: Props) => {
  return (
    <section className="flex flex-col gap-[16px] px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        탑승객 수를 입력해주세요 <span className="text-red-500">*</span>
      </h2>
      <Counter
        count={count}
        setCount={(newValue: number) => {
          setCount(newValue);
        }}
      />
      <p className="text-12 font-400 leading-[19.2px] text-grey-500">
        10명 이상 예약하는 경우, <u>핸디버스 카카오 채널</u>로 문의 바랍니다.
      </p>
    </section>
  );
};

export default PassengerCount;
