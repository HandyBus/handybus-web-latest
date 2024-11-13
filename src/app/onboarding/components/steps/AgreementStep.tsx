import Button from '@/components/buttons/button/Button';
import CheckBox from '@/components/buttons/checkbox/CheckBox';
import useBottomSheet from '@/hooks/useBottomSheet';
import RightArrowIcon from 'public/icons/chevron-right-sm.svg';
import { useEffect, useState } from 'react';
import ServiceBottomSheet from '../bottom-sheets/ServiceBottomSheet';
import PersonalInfoBottomSheet from '../bottom-sheets/PersonalInfoBottomSheet';
import MarketingBottomSheet from '../bottom-sheets/MarketingBottomSheet';

interface Props {
  handleNextStep: () => void;
}

const AgreementStep = ({ handleNextStep }: Props) => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isServiceChecked, setIsServiceChecked] = useState(false);
  const [isPersonalInfoChecked, setIsPersonalInfoChecked] = useState(false);
  const [isMarketingChecked, setIsMarketingChecked] = useState(false);

  const isEnabled = isServiceChecked && isPersonalInfoChecked;

  useEffect(() => {
    setIsAllChecked(
      isServiceChecked && isPersonalInfoChecked && isMarketingChecked,
    );
  }, [isServiceChecked, isPersonalInfoChecked, isMarketingChecked]);

  const handleSetIsAllChecked = (value: boolean) => {
    if (value) {
      setIsServiceChecked(true);
      setIsPersonalInfoChecked(true);
      setIsMarketingChecked(true);
      setIsAllChecked(true);
    } else {
      setIsServiceChecked(false);
      setIsPersonalInfoChecked(false);
      setIsMarketingChecked(false);
      setIsAllChecked(false);
    }
  };

  const {
    bottomSheetRef: serviceBottomSheetRef,
    contentRef: serviceContentRef,
    openBottomSheet: openServiceBottomSheet,
  } = useBottomSheet();

  const {
    bottomSheetRef: personalInfoBottomSheetRef,
    contentRef: personalInfoContentRef,
    openBottomSheet: openPersonalInfoBottomSheet,
  } = useBottomSheet();

  const {
    bottomSheetRef: marketingBottomSheetRef,
    contentRef: marketingContentRef,
    openBottomSheet: openMarketingBottomSheet,
  } = useBottomSheet();

  return (
    <>
      <div className="relative grow">
        <div className="px-28 py-16">
          <h2 className="pb-[6px] text-26 font-700 text-grey-900">
            집에서 콘서트장까지,
            <br />
            핸디버스와 함께
          </h2>
          <p className="text-14 font-600 text-grey-500">
            서비스 가입을 위해
            <br />
            아래 약관에 동의해주세요
          </p>
        </div>
      </div>
      <div className="absolute bottom-[26px] flex w-full flex-col items-center bg-white">
        <section className="w-full px-28 pb-16">
          <div className="flex w-full items-center justify-between border-b border-grey-100 py-16 text-16 font-600 text-grey-800">
            <span>약관 전체 동의</span>
            <CheckBox
              isChecked={isAllChecked}
              setIsChecked={handleSetIsAllChecked}
            />
          </div>
          <AgreementItem
            type="필수"
            title="서비스 이용약관"
            isChecked={isServiceChecked}
            setIsChecked={setIsServiceChecked}
            onClick={openServiceBottomSheet}
          />
          <AgreementItem
            type="필수"
            title="개인정보 수집 및 이용 동의"
            isChecked={isPersonalInfoChecked}
            setIsChecked={setIsPersonalInfoChecked}
            onClick={openPersonalInfoBottomSheet}
          />
          <AgreementItem
            type="선택"
            title="마케팅 활용/광고성 정보 수신 동의"
            isChecked={isMarketingChecked}
            setIsChecked={setIsMarketingChecked}
            onClick={openMarketingBottomSheet}
          />
        </section>
        <div className="w-full px-32 py-8">
          <Button type="button" disabled={!isEnabled} onClick={handleNextStep}>
            다음으로
          </Button>
        </div>
      </div>
      <ServiceBottomSheet
        bottomSheetRef={serviceBottomSheetRef}
        contentRef={serviceContentRef}
        onAccept={() => setIsServiceChecked(true)}
      />
      <PersonalInfoBottomSheet
        bottomSheetRef={personalInfoBottomSheetRef}
        contentRef={personalInfoContentRef}
        onAccept={() => setIsPersonalInfoChecked(true)}
      />
      <MarketingBottomSheet
        bottomSheetRef={marketingBottomSheetRef}
        contentRef={marketingContentRef}
        onAccept={() => setIsMarketingChecked(true)}
      />
    </>
  );
};

export default AgreementStep;

interface AgreementItemProps {
  type: '필수' | '선택';
  title: string;
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  onClick: () => void;
}

const AgreementItem = ({
  type,
  title,
  isChecked,
  setIsChecked,
  onClick,
}: AgreementItemProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between py-16 text-14  text-grey-800"
      onClick={onClick}
    >
      <div className="flex items-center">
        <span
          className={`pr-32 font-600 ${type === '필수' ? 'text-primary-main' : 'text-grey-800'}`}
        >
          {type}
        </span>
        <span className="pr-8 font-400 text-grey-800">{title}</span>
        <RightArrowIcon />
      </div>
      <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
    </button>
  );
};
