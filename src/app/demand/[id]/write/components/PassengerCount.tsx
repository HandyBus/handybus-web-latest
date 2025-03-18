import Counter from '@/components/counter/Counter';

interface Props {
  count: number;
  setCount: (value: number) => void;
}

// NOTE: 기획 상으로 수요조사 탑승객 수를 입력하지 않도록 수정하면서 해당 컴포넌트를 일단 사용하지 않게 되었습니다.
const PassengerCount = ({ count, setCount }: Props) => {
  return (
    <section className="flex flex-col gap-[16px] px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-700">
        탑승객 수를 입력해주세요 <span className="text-red-500">*</span>
      </h2>
      <Counter
        count={count}
        setCount={(newValue: number) => {
          setCount(newValue);
        }}
      />
      <p className="text-12 font-400 leading-[19.2px] text-grey-500">
        10명 이상 예약하는 경우,{' '}
        <a
          href="http://pf.kakao.com/_AxncxhG"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          카카오톡 문의하기
        </a>
        로 문의 바랍니다.
      </p>
    </section>
  );
};

export default PassengerCount;
