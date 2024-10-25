import type { HTMLProps } from 'react';
import ChevronRight from '@/icons/chevron-right.svg';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

const AskHandyButton = (props: Props) => {
  return (
    <button
      className="flex flex-row items-center justify-between gap-16 rounded-[10px] bg-grey-50 p-24"
      {...props}
    >
      <div className="flex flex-col justify-start gap-4 text-left">
        <span className="text-12 font-400 text-grey-600-sub">
          찾는 답변이 없다면
        </span>
        <span className="text-22 font-500 text-grey-800">
          핸디버스에게 물어보기
        </span>
      </div>
      <span className="text-24 text-grey-600-sub">
        <ChevronRight />
      </span>
    </button>
  );
};

export default AskHandyButton;
