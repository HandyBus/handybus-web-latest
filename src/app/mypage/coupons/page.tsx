import CouponList from './components/CouponList';
import RegisterCoupon from './components/RegisterCoupon';
import Header from '@/components/header/Header';

const Page = () => {
  return (
    <>
      <Header />
      <main className="flex grow flex-col">
        <RegisterCoupon />
        <div className="bg-basic-grey-50 h-8" />
        <CouponList />
      </main>
    </>
  );
};

export default Page;
