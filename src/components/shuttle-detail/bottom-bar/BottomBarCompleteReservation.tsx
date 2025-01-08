import Button from '@/components/buttons/button/Button';
import { useRouter } from 'next/navigation';

const BottomBarCompleteReservation = () => {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
      <div className="flex flex-col gap-4 px-16 py-8">
        <div className="flex justify-between gap-8">
          <Button
            variant="secondary"
            className="w-76"
            onClick={() => router.push('/mypage/shuttle')}
          >
            예약 상세 보기
          </Button>
          <Button variant="primary" onClick={() => router.replace('/')}>
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomBarCompleteReservation;
