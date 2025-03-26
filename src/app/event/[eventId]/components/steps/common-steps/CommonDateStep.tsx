'use client';

interface Props {
  toNextStep: () => void;
}

const CommonDateStep = ({ toNextStep }: Props) => {
  return (
    <section>
      {MOCK_DATE.map((date) => (
        <button
          key={date}
          type="button"
          onClick={toNextStep}
          className="block w-full py-12 text-left text-16 font-600 text-basic-grey-700"
        >
          {date}
        </button>
      ))}
    </section>
  );
};

export default CommonDateStep;

const MOCK_DATE = [
  '2025년 3월 21일 (금)',
  '2025년 3월 22일 (토)',
  '2025년 3월 23일 (일)',
];
