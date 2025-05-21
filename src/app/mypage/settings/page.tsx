'use client';

import Header from '@/components/header/Header';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { putUser, useDeleteUser, useGetUser } from '@/services/user.service';
import Loading from '@/components/loading/Loading';
import ListButton from '../components/ListButton';
import { logout } from '@/utils/handleToken.util';
import { formatPhoneNumber } from '@/utils/common.util';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { removeLastLogin } from '@/utils/localStorage';
import { toast } from 'react-toastify';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import useBottomSheet from '@/hooks/useBottomSheet';
import Button from '@/components/buttons/button/Button';

const Page = () => {
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const isLoading = isLoadingUser;

  const formattedPhoneNumber = formatPhoneNumber(user?.phoneNumber ?? '');

  // 마케팅 수신
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(
    user?.marketingConsent ?? false,
  );
  useEffect(() => {
    if (user) {
      setIsMarketingAgreed(user.marketingConsent);
    }
  }, [user]);

  const { mutate: putMarketingAgreement } = usePutMarketingAgreement();

  const handleSwitchClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    putMarketingAgreement(!isMarketingAgreed, {
      onSuccess: () => {
        if (!isMarketingAgreed) {
          setIsMarketingAgreed(true);
        } else {
          setIsMarketingAgreed(false);
        }
      },
    });
  };

  // 탈퇴하기
  const {
    bottomSheetRef: leaveBottomSheetRef,
    openBottomSheet: openLeaveBottomSheet,
    closeBottomSheet: closeLeaveBottomSheet,
  } = useBottomSheet();
  const {
    mutate: deleteUser,
    isPending,
    isSuccess,
  } = useDeleteUser({
    onSuccess: async () => {
      removeLastLogin();
      await logout();
      toast.success('핸디버스를 이용해 주셔서 감사합니다.');
    },
    onError: (e) => {
      console.error(e);
      toast.error('잠시 후 다시 시도해 주세요.');
    },
  });

  const isLeaveDisabled = isPending || isSuccess;

  return (
    <>
      <Header />
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {user && (
          <>
            <main className="flex flex-col gap-[18px] px-16 pt-24">
              <section>
                <h3 className="pb-8 text-14 font-600 text-basic-grey-500">
                  알림
                </h3>
                <ListButton hideArrow>
                  <div className="flex w-full items-center justify-between text-left">
                    <span>마케팅 수신</span>
                    <button
                      onClick={handleSwitchClick}
                      className={`relative flex h-[28px] w-48 overflow-hidden rounded-full transition-all duration-200 ${
                        isMarketingAgreed
                          ? 'bg-brand-primary-400'
                          : 'bg-basic-grey-100'
                      }`}
                    >
                      <div
                        className={`absolute left-[2px] top-[2px] h-24 w-24 rounded-full bg-basic-white shadow-[0_0_10px_0_rgba(0,0,0,0.13)] transition-transform duration-200 ${
                          isMarketingAgreed
                            ? 'translate-x-[20px]'
                            : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </ListButton>
              </section>
              <div className="-mx-16 h-[8px] bg-basic-grey-50" />
              <section>
                <h3 className="pb-8 text-14 font-600 text-basic-grey-500">
                  계정
                </h3>
                <ListButton className="cursor-default" hideArrow>
                  <div className="flex grow items-center text-left">
                    <span>연락처</span>
                    <div className="ml-auto flex items-center gap-[6px]">
                      {user.isConnectedKakao && (
                        <div className="rounded-full bg-[#FEE500] px-8 py-4 text-10 font-600 text-basic-grey-700">
                          카카오 로그인
                        </div>
                      )}
                      {user.isConnectedNaver && (
                        <div className="rounded-full bg-[#03C75A] px-8 py-4 text-10 font-600 text-basic-grey-100">
                          네이버 로그인
                        </div>
                      )}
                      <span className="text-16 font-500 text-basic-grey-300">
                        {formattedPhoneNumber}
                      </span>
                    </div>
                  </div>
                </ListButton>
                <ListButton hideArrow onClick={() => logout()}>
                  로그아웃
                </ListButton>
                <ListButton hideArrow onClick={openLeaveBottomSheet}>
                  탈퇴하기
                </ListButton>
              </section>
            </main>
            <BottomSheet
              ref={leaveBottomSheetRef}
              title="정말 탈퇴하시나요?"
              description="탈퇴하기를 누르면 회원님의 모든 정보와 활동 기록이 삭제됩니다. 삭제된 정보는 복구할 수 없으니 신중하게 결정해 주세요."
            >
              <div className="flex flex-col gap-8">
                <Button
                  variant="p-destructive"
                  onClick={() => deleteUser()}
                  disabled={isLeaveDisabled}
                >
                  탈퇴하기
                </Button>
                <Button
                  variant="text"
                  onClick={closeLeaveBottomSheet}
                  disabled={isLeaveDisabled}
                >
                  취소
                </Button>
              </div>
            </BottomSheet>
          </>
        )}
      </DeferredSuspense>
    </>
  );
};

export default Page;

const usePutMarketingAgreement = () => {
  return useMutation({
    mutationFn: (isAgreedMarketing: boolean) => putUser({ isAgreedMarketing }),
  });
};
