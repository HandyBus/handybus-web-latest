import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import { RefObject } from 'react';

interface Props {
  bottomSheetRef: (node: HTMLDivElement) => void;
  contentRef: RefObject<HTMLDivElement>;
  onAccept: () => void;
  closeBottomSheet: () => void;
}

const PersonalInfoBottomSheet = ({
  bottomSheetRef,
  contentRef,
  onAccept,
  closeBottomSheet,
}: Props) => {
  return (
    <BottomSheet title="개인정보 수집 및 이용 동의" ref={bottomSheetRef}>
      <div className="overflow-y-auto" ref={contentRef}>
        본 약관은 (주)핸디버스(이하 “회사”라 합니다)이 운영하는 웹사이트
        ‘핸디버스’ (handybus.co.kr) (이하 “웹사이트”라 합니다)에서 제공하는
        온라인 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버몰과 이용자의
        권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
      </div>
      <div className="flex gap-8 pb-16 pt-8">
        <Button type="button" variant="secondary" onClick={closeBottomSheet}>
          닫기
        </Button>
        <Button
          type="button"
          onClick={() => {
            onAccept();
            closeBottomSheet();
          }}
        >
          동의하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default PersonalInfoBottomSheet;
