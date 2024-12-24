import Link from 'next/link';
import RefundPolicy from '../RefundPolicy';
import Section from '../Section';
import Button from '@/components/buttons/button/Button';

interface Props {
  id: string;
}

const RefundSection = ({ id }: Props) => {
  return (
    <Section title="취소 및 환불 안내">
      <RefundPolicy />
      <Link href={`/mypage/shuttle/${id}/refund`}>
        <Button variant="secondary">환불 신청하기</Button>
      </Link>
    </Section>
  );
};

export default RefundSection;
