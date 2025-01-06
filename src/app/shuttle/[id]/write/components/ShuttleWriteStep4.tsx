import BannerImage from '@/app/demand/[id]/write/components/BannerImage';

import ReservationCompleted from '../sections/ReservationCompleted';
import ReservationInfo from '../sections/ReservationInfo';
import PriceDetail from '../sections/PriceDetail';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import { BottomBarType } from '@/components/shuttle-detail/bottom-bar/BottomBar.type';
import PassengerInfo from '../sections/PassengerInfo';
import { ReservationFormData } from '../page';
import { useFormContext } from 'react-hook-form';
import { ShuttleRouteType } from '@/types/shuttle.types';

interface Props {
  shuttleData: ShuttleRouteType[];
}

const ShuttleWriteStep4 = ({ shuttleData }: Props) => {
  const { watch } = useFormContext<ReservationFormData>();
  const watchPassengers = watch('passengers');
  const watchCoupon = watch('selectedCoupon');

  return (
    <>
      <ReservationCompleted />
      <BannerImage shuttle={shuttleData[0].shuttle} />
      <ReservationInfo shuttleData={shuttleData} />
      <PassengerInfo passengers={watchPassengers} />
      <section className="px-16 pb-24 pt-32">
        <PriceDetail SelectedCoupon={watchCoupon} shuttleData={shuttleData} />
      </section>
      <BottomBar type={`RESERVATION_WRITE_4` as BottomBarType} />
    </>
  );
};

export default ShuttleWriteStep4;
