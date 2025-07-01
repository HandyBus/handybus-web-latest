import { HandyStatus, ReservationsViewEntity } from '@/types/reservation.type';
import ThinCheckIcon from '../../../icons/icon-check-thin.svg';
import { ShuttleBusesViewEntity } from '@/types/shuttleBus.type';
import Button from '@/components/buttons/button/Button';
import useText from './hooks/useText';
import { useState } from 'react';
import SubmitOpenChatLinkModal from '@/app/mypage/shuttle/components/reservations/reservation-card/components/SubmitOpenChatLinkModal';
import { ReservationProgress } from '@/app/mypage/shuttle/hooks/useReservationProgress';
import CheckIcon from './icons/icon-check.svg';

interface Props {
  reservation: ReservationsViewEntity;
  reservationProgress: ReservationProgress;
  isOpenChatLinkCreated: boolean;
  handyStatus: HandyStatus;
  shuttleBus: ShuttleBusesViewEntity | null | undefined;
  isTaxiRoute: boolean;
}

const ShuttleProgressSection = ({
  reservation,
  reservationProgress,
  isOpenChatLinkCreated,
  handyStatus,
  shuttleBus,
  isTaxiRoute,
}: Props) => {
  const isHandy = handyStatus === 'ACCEPTED';

  const { progressText, descriptionText } = useText({
    reservationProgress,
    isOpenChatLinkCreated,
    isHandy,
    isTaxiRoute,
  });

  const shuttleBusNumber =
    reservationProgress === 'afterBusAssigned' ? shuttleBus?.busNumber : '';

  const [isOpenChatLinkModalOpen, setIsOpenChatLinkModalOpen] = useState(false);
  const openOpenChatLinkModal = () => {
    setIsOpenChatLinkModalOpen(true);
  };
  const closeOpenChatLinkModal = () => {
    setIsOpenChatLinkModalOpen(false);
  };
  const openOpenChatLink = (openChatLink: string | null | undefined) => {
    if (openChatLink) {
      window.open(openChatLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <section className="px-16">
        <h3 className="pb-16 text-16 font-600">셔틀 진행 상황</h3>
        <div className="pb-16">
          <h4 className="flex items-center justify-between pb-12 text-16 font-600">
            <div className="flex items-center gap-8">
              <span
                className={
                  reservationProgress === 'shuttleEnded'
                    ? 'text-basic-grey-500'
                    : ''
                }
              >
                {progressText}
              </span>
              {shuttleBusNumber && (
                <div className="rounded-full border border-basic-grey-200 px-8 py-4 text-10 font-600 text-basic-grey-700">
                  {shuttleBusNumber}
                </div>
              )}
            </div>
            {reservationProgress === 'afterBusAssigned' && (
              <>
                {!isHandy && isOpenChatLinkCreated && (
                  <Button
                    size="small"
                    onClick={() => openOpenChatLink(shuttleBus?.openChatLink)}
                  >
                    채팅방
                  </Button>
                )}
                {isHandy && !isOpenChatLinkCreated && (
                  <Button size="small" onClick={openOpenChatLinkModal}>
                    링크 추가
                  </Button>
                )}
                {isHandy && isOpenChatLinkCreated && (
                  <Button
                    size="small"
                    variant="tertiary"
                    onClick={openOpenChatLinkModal}
                  >
                    변경
                  </Button>
                )}
              </>
            )}
          </h4>
          {isTaxiRoute ? (
            <TaxiRouteProgressBar reservationProgress={reservationProgress} />
          ) : (
            <ShuttleBusProgressBar
              reservationProgress={reservationProgress}
              isOpenChatLinkCreated={isOpenChatLinkCreated}
            />
          )}
        </div>
        <div>
          <p className="pb-8 text-14 font-500 text-basic-grey-700">
            {descriptionText}
          </p>
          {!isTaxiRoute &&
            reservationProgress !== 'shuttleEnded' &&
            reservationProgress !== 'reservationCanceled' && (
              <p className="flex items-center gap-[2px]">
                <ThinCheckIcon />
                <span className="text-14 font-500 text-basic-grey-500">
                  예약한 셔틀은 100% 운행되니 안심하세요.
                </span>
              </p>
            )}
        </div>
      </section>
      <SubmitOpenChatLinkModal
        reservation={reservation}
        isOpen={isOpenChatLinkModalOpen}
        closeModal={closeOpenChatLinkModal}
      />
    </>
  );
};

export default ShuttleProgressSection;

interface ShuttleBusProgressBarProps {
  reservationProgress: ReservationProgress;
  isOpenChatLinkCreated: boolean;
}

const ShuttleBusProgressBar = ({
  reservationProgress,
  isOpenChatLinkCreated,
}: ShuttleBusProgressBarProps) => {
  const isStep2Completed = reservationProgress === 'afterBusAssigned';
  const isStep3Completed =
    reservationProgress === 'afterBusAssigned' && isOpenChatLinkCreated;
  const isShuttleEnded = reservationProgress === 'shuttleEnded';

  return (
    <div className="flex items-center gap-[6px]">
      <div
        className={`flex h-[28px] w-[28px] items-center justify-center rounded-full bg-basic-black text-14 font-600 text-basic-grey-500 ${
          isShuttleEnded ? 'bg-basic-grey-200' : 'bg-basic-black'
        }`}
      >
        <CheckIcon />
      </div>
      <div
        className={`h-[2px] flex-1 rounded-full bg-basic-black ${
          isShuttleEnded ? 'bg-basic-grey-200' : 'bg-basic-black'
        }`}
      />
      <div
        className={`flex h-[28px] w-[28px] items-center justify-center rounded-full bg-basic-black text-14 font-600 text-basic-grey-500 ${
          isShuttleEnded
            ? 'bg-basic-grey-200'
            : isStep2Completed
              ? 'bg-basic-black'
              : 'bg-basic-grey-200'
        }`}
      >
        {isStep2Completed ? <CheckIcon /> : 2}
      </div>
      <div
        className={`h-[2px] flex-1 rounded-full ${
          isShuttleEnded
            ? 'bg-basic-grey-200'
            : isStep2Completed
              ? 'bg-basic-black'
              : 'bg-basic-grey-200'
        }`}
      />
      <div
        className={`flex h-[28px] w-[28px] items-center justify-center rounded-full bg-basic-black text-14 font-600 text-basic-grey-500 ${
          isShuttleEnded
            ? 'bg-basic-grey-200'
            : isStep3Completed
              ? 'bg-basic-black'
              : 'bg-basic-grey-200'
        }`}
      >
        {isStep3Completed ? <CheckIcon /> : 3}
      </div>
    </div>
  );
};

interface TaxiRouteProgressBarProps {
  reservationProgress: ReservationProgress;
}

const TaxiRouteProgressBar = ({
  reservationProgress,
}: TaxiRouteProgressBarProps) => {
  const isStep2Completed = reservationProgress === 'afterBusAssigned';
  const isShuttleEnded = reservationProgress === 'shuttleEnded';

  return (
    <div className="flex items-center gap-[6px]">
      <div
        className={`flex h-[28px] w-[28px] items-center justify-center rounded-full bg-basic-black text-14 font-600 text-basic-grey-500 ${
          isShuttleEnded ? 'bg-basic-grey-200' : 'bg-basic-black'
        }`}
      >
        <CheckIcon />
      </div>
      <div
        className={`h-[2px] flex-1 rounded-full bg-basic-black ${
          isShuttleEnded ? 'bg-basic-grey-200' : 'bg-basic-black'
        }`}
      />
      <div
        className={`flex h-[28px] w-[28px] items-center justify-center rounded-full bg-basic-black text-14 font-600 text-basic-grey-500 ${
          isShuttleEnded
            ? 'bg-basic-grey-200'
            : isStep2Completed
              ? 'bg-basic-black'
              : 'bg-basic-grey-200'
        }`}
      >
        {isStep2Completed ? <CheckIcon /> : 2}
      </div>
    </div>
  );
};
