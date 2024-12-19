import { useRouter } from 'next/navigation';
import Button from '@/components/buttons/button/Button';
import PriceInfo from './PriceInfo';
import { BottomBarType } from './BottomBar.type';

const BottomBarReservationRequest = ({
  type,
  handleNextStep,
  handlePrevStep,
}: {
  type: BottomBarType;
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
}) => {
  const router = useRouter();
  if (type === 'RESERVATION_WRITE_1')
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <div className=" flex justify-between gap-12">
            <Button variant="primary" onClick={handleNextStep}>
              셔틀 예약하기
            </Button>
          </div>
        </div>
      </div>
    );
  if (type === 'RESERVATION_WRITE_2')
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <PriceInfo />
          <div className="flex justify-between gap-8">
            <Button
              variant="secondary"
              className="w-76"
              onClick={handlePrevStep}
            >
              이전
            </Button>
            <Button variant="primary" onClick={handleNextStep}>
              다음단계로
            </Button>
          </div>
        </div>
      </div>
    );
  if (type === 'RESERVATION_WRITE_3')
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <div className=" flex justify-between gap-12">
            <Button variant="primary" onClick={handleNextStep}>
              80,000원 결제하기
            </Button>
          </div>
        </div>
      </div>
    );
  if (type === 'RESERVATION_WRITE_4')
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <PriceInfo />
          <div className="flex justify-between gap-8">
            <Button
              variant="secondary"
              className="w-76"
              // onClick={
              //   // mypage reservation link
              // }
            >
              예약 상세 보기
            </Button>
            <Button variant="primary" onClick={() => router.push('/')}>
              홈으로
            </Button>
          </div>
        </div>
      </div>
    );
};

export default BottomBarReservationRequest;
