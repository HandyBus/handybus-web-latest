import CheckBox from '@/components/buttons/checkbox/CheckBox';
import useBottomSheet from '@/hooks/useBottomSheet';
import RightArrowIcon from 'public/icons/chevron-right-sm.svg';
import { useEffect, useState } from 'react';
import ServiceBottomSheet from '../bottom-sheets/ServiceBottomSheet';
import PersonalInfoBottomSheet from '../bottom-sheets/PersonalInfoBottomSheet';
import MarketingBottomSheet from '../bottom-sheets/MarketingBottomSheet';
import { toast } from 'react-toastify';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import OnboardingTitle from '@/components/onboarding-contents/OnboardingTitle';
import { putUser } from '@/services/user-management.service';
import { useMutation } from '@tanstack/react-query';
import { removeIsOnboarding, setIsLoggedIn } from '@/utils/handleToken.util';
import { setFirstSignup } from '@/utils/localStorage';
import { useRouter } from 'next/navigation';

const AgreementStep = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isServiceChecked, setIsServiceChecked] = useState(false);
  const [isPersonalInfoChecked, setIsPersonalInfoChecked] = useState(false);
  const [isMarketingChecked, setIsMarketingChecked] = useState(false);

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

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const putAgreement = usePutAgreement({
    onSuccess: () => {
      removeIsOnboarding();
      setIsLoggedIn();
      setFirstSignup();
      toast.success('핸디버스에 오신 것을 환영합니다!');
      router.replace('/');
    },
    onError: (e) => {
      console.error(e);
      toast.error('회원가입에 실패하였습니다.');
      setIsSubmitting(false);
    },
  });

  const handleSubmitAgreement = () => {
    setIsSubmitting(true);
    putAgreement.mutate({
      isAgreedMarketing: isMarketingChecked,
      isAgreedServiceTerms: isServiceChecked,
      isAgreedPersonalInfo: isPersonalInfoChecked,
    });
  };

  const disabled =
    !(isServiceChecked && isPersonalInfoChecked) ||
    putAgreement.isPending ||
    isSubmitting;

  return (
    <OnboardingFrame
      handleSubmit={handleSubmitAgreement}
      disabled={disabled}
      buttonText="핸디버스 만나러 가기"
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
      <div className="absolute bottom-[50px] flex w-full flex-col items-center bg-white">
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
      </div>
      <ServiceBottomSheet
        bottomSheetRef={serviceBottomSheetRef}
        contentRef={serviceContentRef}
        onAccept={() => setIsServiceChecked(true)}
        closeBottomSheet={closeServiceBottomSheet}
      />
      <PersonalInfoBottomSheet
        bottomSheetRef={personalInfoBottomSheetRef}
        contentRef={personalInfoContentRef}
        onAccept={() => setIsPersonalInfoChecked(true)}
        closeBottomSheet={closePersonalInfoBottomSheet}
      />
      <MarketingBottomSheet
        bottomSheetRef={marketingBottomSheetRef}
        contentRef={marketingContentRef}
        onAccept={() => setIsMarketingChecked(true)}
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
      className="flex w-full items-center justify-between gap-8 py-16 text-14 text-grey-800"
      onClick={onClick}
    >
      <div className="flex items-center">
        <span
          className={`shrink-0 pr-32 font-600 ${type === '필수' ? 'text-primary-main' : 'text-grey-800'}`}
        >
          {type}
        </span>
        <span className="line-clamp-1 pr-8 font-400 text-grey-800">
          {title}
        </span>
        <RightArrowIcon />
      </div>
      <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
    </button>
  );
};

const usePutAgreement = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
}) => {
  return useMutation({
    mutationFn: (body: {
      isAgreedMarketing: boolean;
      isAgreedServiceTerms: boolean;
      isAgreedPersonalInfo: boolean;
    }) => putUser(body),
    onSuccess,
    onError,
  });
};
