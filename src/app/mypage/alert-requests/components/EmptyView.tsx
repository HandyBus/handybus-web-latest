import Button from '@/components/buttons/button/Button';
import AlarmIcon from '../icons/alarm.svg';
import Link from 'next/link';

const EmptyView = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-40">
      <AlarmIcon />
      <p className="pb-12 text-14 font-600 text-basic-grey-500">
        요청한 알림이 없어요
      </p>
      <Link href="/event">
        <Button variant="secondary" size="small">
          둘러보기
        </Button>
      </Link>
    </div>
  );
};

export default EmptyView;
