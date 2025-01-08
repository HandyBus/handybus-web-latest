import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import LogoLargeIcon from '/public/icons/logo-large.svg';
import { BOTTOM_BAR_TYPE } from '@/components/shuttle-detail/bottom-bar/BottomBar.type';

const PaymentsFail = () => {
  return (
    <>
      <section className="flex h-[539px] flex-col items-center justify-center gap-24">
        <LogoLargeIcon viewBox="0 0 121 75" width="90px" height="44px" />
        <section>
          <h1 className="flex justify-center text-28 font-700 leading-[39.2px] text-black">
            결제가 실패했어요
          </h1>
          <p className="flex justify-center text-16 font-500 leading-[25.6px] text-grey-500">
            처음부터 다시 시도해주세요.
          </p>
        </section>
      </section>
      <BottomBar type={BOTTOM_BAR_TYPE.RESERVATION_WRITE.FAIL} />
    </>
  );
};

export default PaymentsFail;
