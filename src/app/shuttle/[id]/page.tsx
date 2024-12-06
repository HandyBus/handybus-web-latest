import ShuttleDetailPage from '@/components/shuttle-detail/ShuttleDetailPage';

interface PageProps {
  params: {
    id: string;
  };
}

const Shuttle = ({ params }: PageProps) => {
  return <ShuttleDetailPage shuttleId={params.id} type="RESERVATION" />;
};

export default Shuttle;
