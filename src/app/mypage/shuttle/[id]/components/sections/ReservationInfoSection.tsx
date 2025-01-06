'use client';

import Link from 'next/link';
import DetailRow from '../DetailRow';
import Section from '../Section';
import { useState } from 'react';
import HandyRequestModal from '@/components/modals/handy-request/HandyRequestModal';
import { HandyStatusType, ShuttleWithRouteType } from '@/types/client.types';
import { HANDY_STATUS_TEXT, TRIP_TEXT } from '../../../shuttle.constants';
import { parseDateString } from '@/utils/dateString';
import { usePostUpdateReservation } from '@/services/reservation';
import { toast } from 'react-toastify';
import { parsePhoneNumber } from '@/utils/common';
import { TripType } from '@/types/shuttle.types';

interface Props {
  reservationId: number;
  trip: TripType;
  shuttle: ShuttleWithRouteType;
  passengers: {
    name: string;
    phoneNumber: string;
  }[];
  handyStatus: HandyStatusType;
  isShuttleBusAssigned: boolean;
  isExpandable?: boolean;
}

const ReservationInfoSection = ({
  reservationId,
  trip,
  shuttle,
  passengers,
  handyStatus,
  isShuttleBusAssigned,
  isExpandable = false,
}: Props) => {
  const [isHandyRequestModalOpen, setIsHandyRequestModalOpen] = useState(false);

  const onSuccess = () => {
    if (handyStatus === 'NOT_SUPPORTED') {
      toast.success('핸디에 지원해주셔서 감사합니다!');
    } else {
      toast.success('핸디 지원이 취소되었습니다.');
    }
  };
  const onError = () => {
    toast.error('핸디 지원/취소에 실패했습니다.');
  };
  const { mutate: updateReservation } = usePostUpdateReservation(
    reservationId,
    onSuccess,
    onError,
  );

  const handleHandyRequestConfirm = () => {
    updateReservation({
      isSupportingHandy: handyStatus === 'NOT_SUPPORTED' ? true : false,
    });
    setIsHandyRequestModalOpen(false);
  };
  const handleHandyRequestClosed = () => {
    setIsHandyRequestModalOpen(false);
  };

  const tripText = TRIP_TEXT[trip];
  const showToDestination = trip === 'TO_DESTINATION' || trip === 'ROUND_TRIP';
  const showFromDestination =
    trip === 'FROM_DESTINATION' || trip === 'ROUND_TRIP';
  const toDestinationPlace = shuttle.route.hubs.toDestination.find(
    (hub) => hub.selected,
  )?.name;
  const fromDestinationPlace = shuttle.route.hubs.fromDestination.find(
    (hub) => hub.selected,
  )?.name;
  const handyTagText = HANDY_STATUS_TEXT[handyStatus];
  const parsedDate = parseDateString(shuttle.date);

  return (
    <>
      <Section title="예약 정보" isExpandable={isExpandable}>
        <div className="flex flex-col gap-28">
          <section className="flex flex-col gap-8">
            <DetailRow title="탑승일" content={parsedDate} />
            <DetailRow title="노선 종류" content={shuttle.name} />
            <DetailRow title="왕복 여부" content={tripText} />
            {showToDestination && toDestinationPlace && (
              <DetailRow
                title={
                  <>
                    탑승 장소
                    <br />
                    <span className="text-14">(콘서트행)</span>
                  </>
                }
                content={toDestinationPlace}
              />
            )}
            {showFromDestination && fromDestinationPlace && (
              <DetailRow
                title={
                  <>
                    하차 장소
                    <br />
                    <span className="text-14">(귀가행)</span>
                  </>
                }
                content={fromDestinationPlace}
              />
            )}
            <DetailRow title="탑승객 수" content={`${passengers.length}명`} />
          </section>
          {passengers.map((passenger, index) => (
            <Passenger
              key={index}
              index={index + 1}
              name={passenger.name}
              phoneNumber={parsePhoneNumber(passenger.phoneNumber)}
              tagText={index === 0 ? handyTagText : undefined}
            />
          ))}
          {!isShuttleBusAssigned && (
            <>
              <div className="flex flex-col gap-8">
                <button
                  onClick={() => setIsHandyRequestModalOpen(true)}
                  className="ml-auto block w-fit rounded-full bg-grey-100 px-16 text-14 font-400 text-grey-600-sub"
                >
                  핸디 지원/취소하기
                </button>
                <p className="text-right text-12 font-400 text-grey-500">
                  핸디는 탑승객1(직접 신청자)만 지원이 가능합니다.{' '}
                  <Link
                    href="/help/what-is-handy"
                    className="text-right text-12 font-400 text-grey-500 underline"
                  >
                    핸디 더 알아보기
                  </Link>
                </p>
              </div>
              <HandyRequestModal
                isOpen={isHandyRequestModalOpen}
                onConfirm={handleHandyRequestConfirm}
                onClosed={handleHandyRequestClosed}
                buttonText="지원/취소하기"
              />
            </>
          )}
        </div>
      </Section>
    </>
  );
};

export default ReservationInfoSection;

interface PassengerProps {
  index: number;
  name: string;
  phoneNumber: string;
  tagText?: string;
}

const Passenger = ({ index, name, phoneNumber, tagText }: PassengerProps) => {
  return (
    <section className="flex flex-col gap-8">
      <h4 className="flex items-center gap-8 pb-4 text-18 font-500 text-grey-700">
        탑승객 {index}
        {tagText && (
          <div className="rounded-full border border-grey-100 px-8 text-12 font-400 text-grey-600-sub">
            {tagText}
          </div>
        )}
      </h4>
      <DetailRow title="이름" content={name} />
      <DetailRow title="전화번호" content={phoneNumber} />
    </section>
  );
};
