'use client';

import T1Modal from '@/app/(home)/@modal/components/T1Modal';
import ModalPortal from '@/components/modals/ModalPortal';

const T1_EVENT_ID = '596248857575166715';

interface Props {
  eventId: string;
}

const EventModal = ({ eventId }: Props) => {
  return <ModalPortal>{T1_EVENT_ID === eventId && <T1Modal />}</ModalPortal>;
};

export default EventModal;
