import {
  SHUTTLE_BUS_TYPE_TO_STRING,
  ShuttleBusType,
} from '@/constants/shuttleBus';
import DetailRow from '../DetailRow';
import Section from '../Section';

interface Props {
  type: ShuttleBusType;
  name: string;
  busNumber: string;
  openChatLink?: string;
}

const ShuttleInfoSection = ({ type, name, busNumber, openChatLink }: Props) => {
  return (
    <Section title="셔틀 정보">
      <div className="flex flex-col gap-8">
        <DetailRow
          title="차량 종류"
          content={SHUTTLE_BUS_TYPE_TO_STRING[type]}
        />
        <DetailRow title="배정 호차" content={name} />
        <DetailRow title="차량 번호" content={busNumber} />
        {openChatLink && (
          <DetailRow title="오픈채팅방 링크" content={openChatLink} isLink />
        )}
      </div>
    </Section>
  );
};

export default ShuttleInfoSection;
