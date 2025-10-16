import { PaymentsViewEntity } from '@/types/payment.type';
import RegularPriceContent from './components/RegularPriceContent';
import RefundPriceContent from './components/RefundPriceContent';
import WrapperWithDivider from '../../WrapperWithDivider';

interface Props {
  payment: PaymentsViewEntity;
  passengerCount: number;
  isReservationCanceled: boolean;
}

const PriceSection = ({
  payment,
  passengerCount,
  isReservationCanceled,
}: Props) => {
  return (
    <WrapperWithDivider>
      <section className="px-16 py-24">
        <h3 className="pb-16 text-16 font-600">결제 정보</h3>
        {isReservationCanceled ? (
          <RefundPriceContent payment={payment} />
        ) : (
          <RegularPriceContent
            payment={payment}
            passengerCount={passengerCount}
          />
        )}
      </section>
    </WrapperWithDivider>
  );
};

export default PriceSection;
