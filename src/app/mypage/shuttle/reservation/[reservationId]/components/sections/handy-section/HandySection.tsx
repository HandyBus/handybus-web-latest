import { HandyStatus } from '@/types/reservation.type';

interface Props {
  handyStatus: HandyStatus;
}

const HandySection = ({ handyStatus }: Props) => {
  return (
    <>
      <section className="px-16">
        <h3 className="flex items-center justify-between pb-16 text-16 font-600">
          <span>핸디 지원 내역</span>
        </h3>
        <p className="rounded-[8px] bg-basic-grey-50 p-8 text-12 font-600 leading-[160%] text-basic-grey-500">
          {handyStatus !== 'NOT_SUPPORTED'
            ? '2025년 8월 1일부터 모바일 탑승권이 생기면서 핸디 없이도 안전하고 편리하게 탑승할 수 있게 되었어요. 핸디로 지원해주셔서 감사드리며, 앞으로는 더욱 편리해진 모바일 탑승권으로 셔틀을 이용해 주세요.'
            : '2025년 8월 1일부터 모바일 탑승권이 생기면서 핸디 없이도 안전하고 편리하게 탑승할 수 있게 되었어요. 앞으로는 더욱 편리해진 모바일 탑승권으로 셔틀을 이용해 주세요.'}
        </p>
      </section>
    </>
  );
};

export default HandySection;
