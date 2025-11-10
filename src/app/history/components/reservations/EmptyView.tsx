import Button from '@/components/buttons/button/Button';
import GreyCalendarIcon from '../../icons/calendar-grey.svg';
import Link from 'next/link';

const EmptyView = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-40">
      <GreyCalendarIcon />
      <p className="pb-16 text-14 font-600 text-basic-grey-500">
        예약이 없어요
      </p>
      <Link href="/event">
        <Button variant="primary" size="small">
          둘러보기
        </Button>
      </Link>
    </div>
  );
};

export default EmptyView;
