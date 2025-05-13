import Button from '@/components/buttons/button/Button';
import { HandyStatus } from '@/types/reservation.type';

interface Props {
  handyStatus: HandyStatus;
}

const HandySection = ({ handyStatus }: Props) => {
  const historyText =
    handyStatus === 'NOT_SUPPORTED' ? '지원 안함' : '지원 완료';
  const statusText =
    handyStatus === 'NOT_SUPPORTED'
      ? '지원 안함'
      : handyStatus === 'SUPPORTED'
        ? '핸디 선정 중'
        : handyStatus === 'ACCEPTED'
          ? '선정'
          : '미선정';

  return (
    <section className="px-16">
      <h3 className="pb-16 text-16 font-600">
        <span>핸디 지원 내역</span>
        {handyStatus === 'SUPPORTED' && (
          <Button type="button" variant="tertiary" size="small">
            지원 취소
          </Button>
        )}
        {handyStatus === 'ACCEPTED' && (
          <Button type="button" variant="secondary" size="small">
            가이드
          </Button>
        )}
      </h3>
      <div className="grid grid-cols-[72px_1fr] gap-x-16 gap-y-8 text-14 font-600">
        <h5>지역 내역</h5>
        <p>{historyText}</p>
        {handyStatus !== 'NOT_SUPPORTED' && (
          <>
            <h5>상태</h5>
            <p
              className={
                handyStatus === 'ACCEPTED' ? 'text-basic-blue-400' : ''
              }
            >
              {statusText}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default HandySection;
