'use client';

import Button from '@/components/buttons/button/Button';

const DemandComplete = () => {
  return (
    <div className="bg-white absolute inset-0 z-[100] flex flex-col items-center">
      <section className="mt-180 flex flex-col items-center">
        <h3 className="mb-4 text-22 font-700">요청이 완료되었어요</h3>
        <p className="text-center text-16 font-500 text-basic-grey-600">
          셔틀이 열리면 카카오톡으로 알림을 드릴게요.
          <br />
          마이페이지에서 요청 내역을 확인할 수 있어요.
        </p>
      </section>
      <section className="mt-auto flex w-full flex-col items-center gap-8 px-24 pb-32">
        <Button variant="primary" size="large">
          완료
        </Button>
        <Button variant="primary" size="large" className="bg-white">
          의견 보내기
        </Button>
      </section>
    </div>
  );
};

export default DemandComplete;
