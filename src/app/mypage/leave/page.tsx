'use client';

import Button from '@/components/buttons/button/Button';
import CheckBox from '@/components/buttons/checkbox/CheckBox';
import Header from '@/components/header/Header';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import { useDeleteUser } from '@/services/user.service';
import { logout } from '@/utils/handleToken.util';
import { removeLastLogin } from '@/utils/localStorage';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Leave = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const disabled = !isChecked || isPending || isSuccess;

  return (
    <>
      <Header />
      <main className="relative w-full grow">
        <section className="px-32 py-8 pt-28">
          <h2 className="text-basic-grey-700 pb-[6px] text-26 font-700">
            핸디버스를 떠나신다니
            <br />
            너무 아쉬워요
          </h2>
          <p className="text-basic-grey-500 pb-44 text-16 font-600">
            탈퇴 전 다음 사항을 확인해주세요
          </p>
          <h4 className="text-basic-grey-700 pb-[6px] text-18 font-600">
            개인 정보 삭제
          </h4>
          <p className="text-basic-grey-600 text-14 font-400">
            계정을 삭제하면 계정 정보(연동 계정으로부터 제공받은 정보), 회원
            정보(프로필, 성별, 연령대, 거주 지역, 최애 아티스트), 작성한 셔틀
            후기 등 핸디버스에서 활동한 모든 정보가 삭제돼요. 다시 가입하더라도
            복구할 수 없어요.
          </p>
        </section>
        <div className="absolute bottom-0 flex w-full flex-col gap-8 px-32 pb-20">
          <button
            className="flex w-fit items-center gap-8"
            onClick={() => setIsChecked((prev) => !prev)}
          >
            <CheckBox isChecked={isChecked} />
            <span>유의사항을 모두 확인했어요.</span>
          </button>
          <Button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(true)}
          >
            탈퇴 계속하기
          </Button>
        </div>
      </main>
      <ConfirmModal
        title="정말 핸디버스를 떠나시겠어요?"
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}
        buttonLabels={{ back: '안 떠날래요', confirm: '탈퇴하기' }}
        onConfirm={deleteUser}
        disabled={disabled}
      />
    </>
  );
};

export default Leave;
