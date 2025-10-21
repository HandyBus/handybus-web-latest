'use client';

import Button from '@/components/buttons/button/Button';
import { useState } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import { toast } from 'react-toastify';
import useAppRouter from '@/hooks/useAppRouter';

interface Props {
  initialPhoneNumber: string;
}

const PhoneNumberSection = ({ initialPhoneNumber }: Props) => {
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '');
    if (numbers.length > 11) {
      return value;
    }
    if (numbers.length <= 3) {
      return numbers;
    }
    if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  };

  const convertInternationalToDisplayFormat = (phoneNumber: string) => {
    if (!phoneNumber) {
      return '';
    }
    const normalized = phoneNumber.startsWith('+82')
      ? '0' + phoneNumber.slice(3)
      : phoneNumber;
    return formatPhoneNumber(normalized);
  };

  const [value, setValue] = useState(
    convertInternationalToDisplayFormat(initialPhoneNumber),
  );

  const isPhoneNumberCompleteAndChanged = (phoneNumber: string) => {
    const numbers = phoneNumber.replace(/[^0-9]/g, '');
    const isChanged =
      phoneNumber !== convertInternationalToDisplayFormat(initialPhoneNumber);
    return numbers.length === 11 && isChanged;
  };

  const handlePhoneNumberChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setValue(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 숫자와 백스페이스, 삭제 키만 허용
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
  };

  const router = useAppRouter();
  const handlePhoneNumberVerification = async () => {
    const redirectUrl =
      process.env
        .NEXT_PUBLIC_PROFILE_EDIT_PORTONE_IDENTITY_VERIFICATION_REDIRECT_URI;
    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const danalChannelKey = process.env.NEXT_PUBLIC_PORTONE_DANAL_CHANNEL_KEY;

    if (!redirectUrl || !storeId || !danalChannelKey) {
      toast.error('잠시 후 다시 시도해주세요.');
      return;
    }

    const phoneNumber = value.replace(/-/g, '');

    // 모바일 환경에서는 자동으로 리다이렉트 됨
    const response = await PortOne.requestIdentityVerification({
      storeId,
      identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
      channelKey: danalChannelKey,
      redirectUrl,
      popup: {
        center: true,
      },
      // 입력한 전화번호 값으로 고정
      customer: {
        phoneNumber,
      },
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
    <section className="px-16">
      <label
        htmlFor="phoneNumber"
        className="h-20 text-14 font-600 leading-[140%]"
      >
        연락처
      </label>
      <div className="relative">
        <input
          id="phoneNumber"
          type="tel"
          inputMode="numeric"
          maxLength={13}
          placeholder={convertInternationalToDisplayFormat(initialPhoneNumber)}
          value={value}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-48 w-full rounded-[0px] border-b border-basic-grey-200 p-12 pr-80 text-16 font-500 outline-none placeholder:text-basic-grey-400 focus:[&:not([disabled])]:border-brand-primary-400"
        />
        <Button
          type="button"
          variant="primary"
          size="small"
          disabled={!isPhoneNumberCompleteAndChanged(value)}
          onClick={handlePhoneNumberVerification}
          className="absolute right-12 top-1/2 -translate-y-1/2"
        >
          변경하기
        </Button>
      </div>
    </section>
  );
};

export default PhoneNumberSection;
