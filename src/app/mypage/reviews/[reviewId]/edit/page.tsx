'use client';

import Header from '@/components/header/Header';
import EventInfoCard from '../write/components/EventInfoCard';
import ReviewForm from '../write/components/ReviewForm';

const EditReviewPage = () => {
  return (
    <main>
      <Header />
      <EventInfoCard />
      <Divider />
      <ReviewForm />
    </main>
  );
};

export default EditReviewPage;

const Divider = () => {
  return <div className="h-[8px] w-full bg-basic-grey-50" />;
};
