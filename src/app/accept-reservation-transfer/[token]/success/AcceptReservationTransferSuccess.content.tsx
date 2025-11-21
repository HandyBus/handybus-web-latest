import AcceptedScreen from './components/AcceptedScreen';
import AlreadyAcceptedScreen from './components/AlreadyAcceptedScreen';

interface Props {
  status: 'accepted' | 'already-accepted';
}

const AcceptReservationTransferSuccess = ({ status }: Props) => {
  if (status === 'accepted') {
    return <AcceptedScreen />;
  }
  if (status === 'already-accepted') {
    return <AlreadyAcceptedScreen />;
  }
  return null;
};

export default AcceptReservationTransferSuccess;
