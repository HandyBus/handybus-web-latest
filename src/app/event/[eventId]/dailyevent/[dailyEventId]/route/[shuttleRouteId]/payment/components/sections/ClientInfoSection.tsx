import { UsersViewEntity } from '@/types/user.type';
import Section from '../Section';
import { formatPhoneNumber } from '@/utils/common.util';

interface Props {
  user: UsersViewEntity;
}

const ClientInfoSection = ({ user }: Props) => {
  const phoneNumber = formatPhoneNumber(user.phoneNumber ?? '');

  return (
    <Section heading="예약자 정보">
      <ul className="flex flex-col gap-8">
        <li className="flex gap-16">
          <p className="w-[71px] shrink-0 text-14 font-600 leading-[160%]">
            예약자명
          </p>
          <span className="text-14 font-600 leading-[160%]">
            {user.name || user.nickname}
          </span>
        </li>
        <li className="flex gap-16">
          <p className="w-[71px] shrink-0 text-14 font-600 leading-[160%]">
            연락처
          </p>
          <span className="text-14 font-600 leading-[160%]">{phoneNumber}</span>
        </li>
      </ul>
    </Section>
  );
};

export default ClientInfoSection;
