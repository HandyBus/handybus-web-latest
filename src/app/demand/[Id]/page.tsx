import ShuttleDetailPage from '@/app/shuttle-detail/ShuttleDetailPage';

const Demand = ({ params }: { params: { id: string } }) => {
  return <ShuttleDetailPage shuttleId={params.id} type="DEMAND" />;
};

export default Demand;
