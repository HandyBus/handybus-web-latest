import { formatPhoneNumber } from '@/utils/common.util';
import WrapperWithDivider from './WrapperWithDivider';
import { ReservationsViewEntity } from '@/types/reservation.type';

interface Props {
  reservation: ReservationsViewEntity;
}

const SenderSection = ({ reservation }: Props) => {
  const senderName = reservation.userName || reservation.userNickname;
  const senderPhoneNumber = formatPhoneNumber(
    reservation.userPhoneNumber,
    true,
  );
  return (
    <WrapperWithDivider>
      <section className="p-16">
        <h3 className="pb-16 text-16 font-600">보낸 사람</h3>
        <div className="grid grid-cols-[72px_1fr] gap-x-16 gap-y-8 text-14 font-600">
          <h5>이름</h5>
          <p>{senderName}</p>
          <h5>연락처</h5>
          <p>{senderPhoneNumber}</p>
        </div>
      </section>
    </WrapperWithDivider>
  );
};

export default SenderSection;
