import { ReservationProgress } from '../../../../hooks/useReservationProgress';
import { HandyStatus, ReservationsViewEntity } from '@/types/reservation.type';
import CheckIcon from '../../../icons/icon-check-thin.svg';
import { ShuttleBusesViewEntity } from '@/types/shuttleBus.type';
import Button from '@/components/buttons/button/Button';
import useText from './hooks/useText';
import { useState } from 'react';
import SubmitOpenChatLinkModal from '@/app/mypage/shuttle/components/reservations/reservation-card/components/SubmitOpenChatLinkModal';

interface Props {
  reservation: ReservationsViewEntity;
  reservationProgress: ReservationProgress;
  isOpenChatLinkCreated: boolean;
  handyStatus: HandyStatus;
  shuttleBus: ShuttleBusesViewEntity | null | undefined;
}

const ShuttleProgressSection = ({
  reservation,
  reservationProgress,
  isOpenChatLinkCreated,
  handyStatus,
  shuttleBus,
}: Props) => {
  const isHandy = handyStatus === 'ACCEPTED';

  const { progressText, descriptionText } = useText({
    reservationProgress,
    isOpenChatLinkCreated,
    isHandy,
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
      window.open(openChatLink, '_blank');
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
          <div className="flex items-center gap-[6px]">
            <div
              className={`h-4 flex-1 rounded-full ${
                reservationProgress === 'beforeBusAssigned' ||
                reservationProgress === 'afterBusAssigned'
                  ? 'bg-basic-grey-700'
                  : 'bg-basic-grey-200'
              }`}
            />
            <div
              className={`h-4 flex-1 rounded-full ${
                reservationProgress === 'afterBusAssigned'
                  ? 'bg-basic-grey-700'
                  : 'bg-basic-grey-200'
              }`}
            />
            <div
              className={`h-4 flex-1 rounded-full ${
                reservationProgress === 'afterBusAssigned' &&
                isOpenChatLinkCreated
                  ? 'bg-basic-grey-700'
                  : 'bg-basic-grey-200'
              }`}
            />
          </div>
        </div>
        <div>
          <p className="pb-8 text-14 font-500 text-basic-grey-700">
            {descriptionText}
          </p>
          <p className="flex items-center gap-[2px]">
            <CheckIcon />
            <span className="text-14 font-500 text-basic-grey-500">
              예약한 셔틀은 100% 운행되니 안심하세요.
            </span>
          </p>
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
