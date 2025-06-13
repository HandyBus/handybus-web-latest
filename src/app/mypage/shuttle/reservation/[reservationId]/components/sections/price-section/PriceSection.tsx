import { PaymentsViewEntity } from '@/types/payment.type';
import RegularPriceContent from './components/RegularPriceContent';
import RefundPriceContent from './components/RefundPriceContent';

interface Props {
  payment: PaymentsViewEntity;
  passengerCount: number;
  isCanceled: boolean;
  isHandySupported: boolean;
}

const PriceSection = ({
  payment,
  passengerCount,
  isCanceled,
  isHandySupported,
}: Props) => {
  return (
    <section className="px-16">
      <h3 className="pb-16 text-16 font-600">결제 정보</h3>
      {isCanceled ? (
        <RefundPriceContent payment={payment} />
      ) : (
        <RegularPriceContent
          payment={payment}
          passengerCount={passengerCount}
          isHandySupported={isHandySupported}
        />
      )}
    </section>
  );
};

export default PriceSection;
