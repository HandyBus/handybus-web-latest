import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import useBottomSheet from '@/hooks/useBottomSheet';

const SubmitSection = () => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();
  return (
    <>
      <div className="flex-1" />
      <section className="p-16">
        <Button
          type="button"
          variant="secondary"
          size="large"
          onClick={openBottomSheet}
        >
          선물하기
        </Button>
      </section>
      <BottomSheet ref={bottomSheetRef} title="이 연락처로 탑승권을 보낼까요?">
        <div ref={contentRef} className="flex flex-col gap-16">
          <div className="flex flex-col items-center justify-center gap-8 rounded-8 bg-basic-grey-50 p-16">
            <h5 className="text-18 font-600">받는 사람</h5>
            <h6 className="text-18 font-500">010-1234-5678</h6>
          </div>
          <Button
            type="button"
            variant="primary"
            size="large"
            onClick={closeBottomSheet}
          >
            탑승권 보내기
          </Button>
        </div>
      </BottomSheet>
    </>
  );
};

export default SubmitSection;
