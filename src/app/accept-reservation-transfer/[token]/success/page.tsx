import AcceptedScreen from './components/AcceptedScreen';
import AlreadyAcceptedScreen from './components/AlreadyAcceptedScreen';

interface Props {
  searchParams: {
    status: 'accepted' | 'already-accepted';
  };
}

const Page = ({ searchParams }: Props) => {
  const { status } = searchParams;
  if (status === 'accepted') {
    return <AcceptedScreen />;
  }
  if (status === 'already-accepted') {
    return <AlreadyAcceptedScreen />;
  }
  return null;
};

export default Page;
