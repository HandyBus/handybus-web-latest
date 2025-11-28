import CouponList from './components/CouponList';
import RegisterCoupon from './components/RegisterCoupon';

const Page = () => {
  return (
    <main className="flex grow flex-col">
      <RegisterCoupon />
      <div className="h-8 bg-basic-grey-50" />
      <CouponList />
    </main>
  );
};

export default Page;
