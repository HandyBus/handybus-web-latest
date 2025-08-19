'use client';

import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import PhoneNumberContent from '@/components/onboarding-contents/PhoneNumberContent';
import * as PortOne from '@portone/browser-sdk/v2';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface Props {
  handleNextStep: () => void;
}

const PhoneNumberStep = ({ handleNextStep }: Props) => {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePhoneNumberValidation = async () => {
    const redirectUrl = process.env.NEXT_PUBLIC_VERIFICATION_REDIRECT_URI;
    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const danalChannelKey = process.env.NEXT_PUBLIC_PORTONE_DANAL_CHANNEL_KEY;

    if (!redirectUrl || !storeId || !danalChannelKey) {
      toast.error('잠시 후 다시 시도해주세요.');
      return;
    }

    // 모바일 환경에서는 자동으로 리다이렉트 됨
    const response = await PortOne.requestIdentityVerification({
      storeId,
      identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
      channelKey: danalChannelKey,
      redirectUrl,
    });

    // PC 환경 리다이렉트 처리
    if (!response || response.code !== undefined) {
      console.error('PortOne 인증 실패: ', response);
      toast.error('잠시 후 다시 시도해주세요.');
      return;
    }

    router.replace(
      `${redirectUrl}?identityVerificationId=${response.identityVerificationId}`,
    );
  };

  return (
    <OnboardingFrame>
      <PhoneNumberContent
        title={
          <>
            빠른 가입을 위해
            <br />
            본인 인증을 진행할게요
          </>
        }
        handleNextStep={handleNextStep}
      />
    </OnboardingFrame>
  );
};

export default PhoneNumberStep;
