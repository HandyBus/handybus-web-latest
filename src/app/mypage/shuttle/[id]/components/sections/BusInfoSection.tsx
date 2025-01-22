import { SHUTTLE_BUS_TYPE_TO_STRING } from '@/constants/shuttleBus';
import DetailRow from '../DetailRow';
import Section from '../Section';
import { ShuttleBus } from '@/types/shuttle-operation.type';

interface Props {
  shuttleBus: ShuttleBus;
}

const BusInfoSection = ({ shuttleBus }: Props) => {
  return (
    <Section title="셔틀 정보">
      <div className="flex flex-col gap-8">
        <DetailRow
          title="차량 종류"
          content={SHUTTLE_BUS_TYPE_TO_STRING[shuttleBus.busType]}
        />
        <DetailRow title="배정 호차" content={shuttleBus.busName} />
        <DetailRow title="차량 번호" content={shuttleBus.busNumber} />
        {shuttleBus?.openChatLink && (
          <DetailRow
            title="오픈채팅방 링크"
            content={shuttleBus.openChatLink}
            isLink
          />
        )}
      </div>
    </Section>
  );
};

export default BusInfoSection;
