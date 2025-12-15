import { useState } from 'react';
import ChevronThinUpIcon from './icons/icon-chevron-thin-up.svg';

const PaybackTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (isOpen) {
    return (
      <div className="flex flex-col rounded-8 bg-basic-grey-50 px-16 py-[13px]">
        <div className="text-10 font-400 leading-[160%] text-basic-grey-600">
          <div className="mb-12 grid grid-cols-3 text-center">
            <div>친구 수</div>
            <div>추가 환급액</div>
            <div>총 환급액</div>
          </div>
          <div className="flex flex-col gap-12 text-center">
            {Array.from({ length: 13 }).map((_, i) => {
              const count = i + 1;
              const additional = count * 1000;
              const total = (count * (count + 1) * 1000) / 2;
              return (
                <div key={count} className="grid grid-cols-3">
                  <div>{count}</div>
                  <div>{additional.toLocaleString()}원</div>
                  <div className="font-600 text-basic-grey-700">
                    {total.toLocaleString()}원
                  </div>
                </div>
              );
            })}
            <div className="grid grid-cols-3 text-basic-grey-400">
              <div>⋮</div>
              <div>⋮</div>
              <div>⋮</div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="mt-16 flex items-center justify-center gap-4 text-12 font-500 leading-[160%] text-basic-grey-600"
        >
          접기
          <ChevronThinUpIcon className="h-20 w-20" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 rounded-8 bg-basic-grey-50 px-16 py-[13px]">
      <div className="flex justify-between text-center text-10 font-600 leading-[160%] text-basic-grey-600">
        <div className="flex flex-col gap-4">
          <span>1명</span>
          <span className="font-400">기본 1,000원</span>
        </div>
        <div className="flex flex-col gap-4">
          <span>3명</span>
          <span className="font-400">+5,000원 추가</span>
        </div>
        <div className="flex flex-col gap-4">
          <span>5명</span>
          <span className="font-400">+14,000원 추가</span>
        </div>
        <div className="flex flex-col gap-4">
          <span>8명</span>
          <span className="font-400">+38,000원 추가</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center justify-center gap-4 text-12 font-500 leading-[160%] text-basic-grey-600"
      >
        더 알아보기
        <ChevronThinUpIcon className="h-20 w-20 rotate-180" />
      </button>
    </div>
  );
};

export default PaybackTable;
