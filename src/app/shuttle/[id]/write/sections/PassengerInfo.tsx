import { useFormContext } from 'react-hook-form';
import { ReservationFormData } from '../page';

const PassengerInfo = () => {
  const { getValues } = useFormContext<ReservationFormData>();
  const passengers = getValues('passengers');
  const passengerCount = getValues('passengerCount');

  return (
    <section className="flex flex-col gap-[32px] px-12 py-32">
      {Array.from({ length: passengerCount }).map((_, index) => (
        <div key={index} className="flex flex-col gap-[16px]">
          <h3 className="text-18 font-500 leading-[25.2px] text-grey-700">
            탑승객 {index + 1}
          </h3>
          <div className="grid grid-cols-[80px_1fr] gap-x-32 gap-y-12">
            <div className="text-16 font-400 leading-[24px] text-grey-600-sub">
              이름
            </div>
            <div className="text-16 font-400 leading-[24px] text-grey-900">
              {passengers[index]?.name}
            </div>

            <div className="text-16 font-400 leading-[24px] text-grey-600-sub">
              전화번호
            </div>
            <div className="text-16 font-400 leading-[24px] text-grey-800">
              {passengers[index]?.phoneNumber}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PassengerInfo;
