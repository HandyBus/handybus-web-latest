import { formatPhoneNumber } from '@/utils/common.util';
import WrapperWithDivider from '../WrapperWithDivider';

interface Props {
  name: string;
  phoneNumber: string;
}

const ReservationPersonInfoSection = ({ name, phoneNumber }: Props) => {
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  return (
    <WrapperWithDivider>
      <section className="px-16 py-24">
        <h3 className="pb-16 text-16 font-600">예약자 정보</h3>
        <div className="grid grid-cols-[72px_1fr] gap-x-16 gap-y-8 text-14 font-600">
          <h5>예약자명</h5>
          <p>{name}</p>
          <h5>연락처</h5>
          <p>{formattedPhoneNumber}</p>
        </div>
      </section>
    </WrapperWithDivider>
  );
};

export default ReservationPersonInfoSection;
