'use client';

import Image from 'next/image';
import ModalPortal from '@/components/modals/ModalPortal';
import Button from '@/components/buttons/button/Button';
import { customTwMerge } from 'tailwind.config';
import allowAlarmImage from '../images/allow-alarm.png';
import CheckIcon from '../icons/check.svg';
import BellIcon from '../icons/bell.svg';

interface Props {
  isOpen: boolean;
  isPushEnabled: boolean;
  onClose: () => void;
  onEnableNotification: () => void;
}

const ArtistNotificationModal = ({
  isOpen,
  isPushEnabled,
  onClose,
  onEnableNotification,
}: Props) => {
  return (
    <ModalPortal>
      <div
        onClick={onClose}
        className={customTwMerge(
          'fixed inset-0 z-[101] bg-basic-black/50',
          !isOpen && 'hidden',
        )}
      >
        <section
          onClick={(e) => e.stopPropagation()}
          className="absolute left-1/2 top-1/2 w-[327px] -translate-x-1/2 -translate-y-1/2 rounded-16 bg-basic-white p-24"
        >
          <div className="mb-16 flex justify-center">
            {isPushEnabled ? <CheckIcon /> : <BellIcon />}
          </div>

          <h2 className="mb-8 text-center text-18 font-700 leading-[140%]">
            {isPushEnabled
              ? '알림 설정이 완료되었어요'
              : '기기 알림을 켜주세요'}
          </h2>

          <p className="text-center text-14 font-400 leading-[160%] text-basic-grey-600">
            {isPushEnabled ? (
              <>
                마이페이지 → 내 아티스트에서
                <br />
                알림 받는 아티스트를 확인할 수 있어요.
              </>
            ) : (
              <>
                아티스트 알림을 받으려면 알림 허용이 필요해요.
                <br />
                알림 → 알림 허용을 켜주세요.
              </>
            )}
          </p>

          {!isPushEnabled && (
            <Image
              src={allowAlarmImage}
              alt="알림 허용 설정 안내"
              className="mt-8 w-full"
            />
          )}

          <div className="mt-16 flex gap-8">
            {isPushEnabled ? (
              <Button variant="tertiary" onClick={onClose}>
                닫기
              </Button>
            ) : (
              <>
                <Button variant="tertiary" onClick={onClose}>
                  닫기
                </Button>
                <Button variant="primary" onClick={onEnableNotification}>
                  알림 켜기
                </Button>
              </>
            )}
          </div>
        </section>
      </div>
    </ModalPortal>
  );
};

export default ArtistNotificationModal;
