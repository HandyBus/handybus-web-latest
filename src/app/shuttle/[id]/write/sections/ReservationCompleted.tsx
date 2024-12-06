import LogoLargeIcon from '/public/icons/logo-large.svg';

const ReservationCompleted = () => {
  return (
    <section className="flex h-[539px] flex-col items-center justify-center gap-24">
      <LogoLargeIcon viewBox="0 0 121 75" width="90px" height="44px" />
      <section>
        <h1 className="text-28 font-700 leading-[39.2px] text-black">
          예약이 완료되었어요
        </h1>
        <p className="text-16 font-500 leading-[25.6px] text-grey-500">
          핸디버스와 함께 콘서트 갈 준비 완료!
        </p>
      </section>
    </section>
  );
};

export default ReservationCompleted;
