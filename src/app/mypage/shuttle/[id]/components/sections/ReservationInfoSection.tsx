'use client';

import Link from 'next/link';
import DetailRow from '../DetailRow';
import Section from '../Section';
import { useState } from 'react';
import HandyRequestModal from '@/components/modals/handy-request/HandyRequestModal';
import {
  HandyStatusType,
  ShuttleWithRouteType,
  TripType,
} from '@/types/client.types';
import { HANDY_STATUS_TEXT, TRIP_TEXT } from '../../../shuttle.constants';

interface Props {
  isExpandable?: boolean;
  trip: TripType;
  shuttle: ShuttleWithRouteType;
  passengers: {
    name: string;
    phoneNumber: string;
  }[];
  handyStatus: HandyStatusType;
  isShuttleAssigned: boolean;
}

const ReservationInfoSection = ({
  isExpandable = false,
  trip,
  shuttle,
  passengers,
  handyStatus,
  isShuttleAssigned,
}: Props) => {
  const [isHandyRequestModalOpen, setIsHandyRequestModalOpen] = useState(false);
  const handleHandyRequestConfirm = () => {
    setIsHandyRequestModalOpen(false);
  };
  const handleHandyRequestClosed = () => {
    setIsHandyRequestModalOpen(false);
  };

  const tripText = TRIP_TEXT[trip];
  const showPickup = trip === 'TO_DESTINATION' || trip === 'ROUND_TRIP';
  const showDropoff = trip === 'FROM_DESTINATION' || trip === 'ROUND_TRIP';
  const pickupPlace = shuttle.route.hubs.pickup.find(
    (hub) => hub.selected,
  )?.name;
  const dropoffPlace = shuttle.route.hubs.dropoff.find(
    (hub) => hub.selected,
  )?.name;
  const handyTagText = HANDY_STATUS_TEXT[handyStatus];

  const parsePhoneNumber = (phoneNumber: string) => {
    return '0' + phoneNumber.slice(3);
  };

  return (
    <>
      <Section title="예약 정보" isExpandable={isExpandable}>
        <div className="flex flex-col gap-28">
          <section className="flex flex-col gap-8">
            <DetailRow title="탑승일" content={shuttle.date} />
            <DetailRow title="노선 종류" content={shuttle.name} />
            <DetailRow title="왕복 여부" content={tripText} />
            {showPickup && pickupPlace && (
              <DetailRow
                title={
                  <>
                    탑승 장소
                    <br />
                    <span className="text-14">(콘서트행)</span>
                  </>
                }
                content={pickupPlace}
              />
            )}
            {showDropoff && dropoffPlace && (
              <DetailRow
                title={
                  <>
                    하차 장소
                    <br />
                    <span className="text-14">(귀가행)</span>
                  </>
                }
                content={dropoffPlace}
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
          {!isShuttleAssigned && (
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