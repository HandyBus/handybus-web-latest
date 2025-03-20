import CheckBox from '@/components/buttons/checkbox/CheckBox';
import useBottomSheet from '@/hooks/useBottomSheet';
import RightArrowIcon from 'public/icons/chevron-right-sm.svg';
import { useEffect, useState } from 'react';
import ServiceBottomSheet from '../bottom-sheets/ServiceBottomSheet';
import PersonalInfoBottomSheet from '../bottom-sheets/PersonalInfoBottomSheet';
import MarketingBottomSheet from '../bottom-sheets/MarketingBottomSheet';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import OnboardingTitle from '@/components/onboarding-contents/OnboardingTitle';
import { useFormContext, useWatch } from 'react-hook-form';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';

interface Props {
  handleNextStep: () => void;
  triggerSubmitForm: () => void;
  hasPersonalInfo: boolean;
  disabled: boolean;
}

const AgreementStep = ({
  handleNextStep,
  triggerSubmitForm,
  hasPersonalInfo,
  disabled,
}: Props) => {
  const { control, setValue } = useFormContext<OnboardingFormValues>();

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isAgreedServiceTerms, isAgreedPersonalInfo, isAgreedMarketing] =
    useWatch({
      control,
      name: [
        'isAgreedServiceTerms',
        'isAgreedPersonalInfo',
        'isAgreedMarketing',
      ],
    });

  useEffect(() => {
    setIsAllChecked(
      isAgreedServiceTerms && isAgreedPersonalInfo && isAgreedMarketing,
    );
  }, [isAgreedServiceTerms, isAgreedPersonalInfo, isAgreedMarketing]);

  const handleSetIsAllChecked = (value: boolean) => {
    if (value) {
      setValue('isAgreedServiceTerms', true);
      setValue('isAgreedPersonalInfo', true);
      setValue('isAgreedMarketing', true);
      setIsAllChecked(true);
    } else {
      setValue('isAgreedServiceTerms', false);
      setValue('isAgreedPersonalInfo', false);
      setValue('isAgreedMarketing', false);
      setIsAllChecked(false);
    }
  };

  const {
    bottomSheetRef: serviceBottomSheetRef,
    contentRef: serviceContentRef,
    openBottomSheet: openServiceBottomSheet,
    closeBottomSheet: closeServiceBottomSheet,
  } = useBottomSheet();

  const {
    bottomSheetRef: personalInfoBottomSheetRef,
    contentRef: personalInfoContentRef,
    openBottomSheet: openPersonalInfoBottomSheet,
    closeBottomSheet: closePersonalInfoBottomSheet,
  } = useBottomSheet();

  const {
    bottomSheetRef: marketingBottomSheetRef,
    contentRef: marketingContentRef,
    openBottomSheet: openMarketingBottomSheet,
    closeBottomSheet: closeMarketingBottomSheet,
  } = useBottomSheet();

  const buttonText = hasPersonalInfo ? '핸디버스 만나러 가기' : '다음으로';

  const handleSubmit = () => {
    if (hasPersonalInfo) {
      triggerSubmitForm();
    } else {
      handleNextStep();
    }
  };

  const buttonDisabled =
    disabled || !isAgreedServiceTerms || !isAgreedPersonalInfo;

  return (
    <OnboardingFrame
      handleSubmit={handleSubmit}
      buttonText={buttonText}
      disabled={buttonDisabled}
    >
      <OnboardingTitle
        title={
          <>
            집에서 콘서트장까지, <br />
            핸디버스와 함께
          </>
        }
        description={
          <>
            서비스 가입을 위해 <br />
            아래 약관에 동의해주세요
          </>
        }
      />
      <div className="absolute bottom-[50px] flex w-full flex-col items-center bg-basic-white">
        <section className="w-full px-28 pb-16">
          <div className="border-basic-grey-100 text-basic-grey-700 flex w-full items-center justify-between border-b py-16 text-16 font-600">
            <span>약관 전체 동의</span>
            <CheckBox
              isChecked={isAllChecked}
              setIsChecked={handleSetIsAllChecked}
            />
          </div>
          <AgreementItem
            type="필수"
            title="서비스 이용약관"
            isChecked={isAgreedServiceTerms}
            setIsChecked={() =>
              setValue('isAgreedServiceTerms', !isAgreedServiceTerms)
            }
            onClick={openServiceBottomSheet}
          />
          <AgreementItem
            type="필수"
            title="개인정보 수집 및 이용 동의"
            isChecked={isAgreedPersonalInfo}
            setIsChecked={() =>
              setValue('isAgreedPersonalInfo', !isAgreedPersonalInfo)
            }
            onClick={openPersonalInfoBottomSheet}
          />
          <AgreementItem
            type="선택"
            title="마케팅 활용/광고성 정보 수신 동의"
            isChecked={isAgreedMarketing}
            setIsChecked={() =>
              setValue('isAgreedMarketing', !isAgreedMarketing)
            }
            onClick={openMarketingBottomSheet}
          />
        </section>
      </div>
      <ServiceBottomSheet
        bottomSheetRef={serviceBottomSheetRef}
        contentRef={serviceContentRef}
        onAccept={() => setValue('isAgreedServiceTerms', true)}
        closeBottomSheet={closeServiceBottomSheet}
      />
      <PersonalInfoBottomSheet
        bottomSheetRef={personalInfoBottomSheetRef}
        contentRef={personalInfoContentRef}
        onAccept={() => setValue('isAgreedPersonalInfo', true)}
        closeBottomSheet={closePersonalInfoBottomSheet}
      />
      <MarketingBottomSheet
        bottomSheetRef={marketingBottomSheetRef}
        contentRef={marketingContentRef}
        onAccept={() => setValue('isAgreedMarketing', true)}
        closeBottomSheet={closeMarketingBottomSheet}
      />
    </OnboardingFrame>
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
      className="text-basic-grey-700 flex w-full items-center justify-between gap-8 py-16 text-14"
      onClick={onClick}
    >
      <div className="flex items-center">
        <span
          className={`shrink-0 pr-32 font-600 ${type === '필수' ? 'text-brand-primary-400' : 'text-basic-grey-700'}`}
        >
          {type}
        </span>
        <span className="text-basic-grey-700 line-clamp-1 pr-8 font-400">
          {title}
        </span>
        <RightArrowIcon />
      </div>
      <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
    </button>
  );
};
