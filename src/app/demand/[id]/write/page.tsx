'use client';

import AppBar from '@/components/app-bar/AppBar';
import { useRouter } from 'next/navigation';
import WriteForm from './sections/WriteForm';
import BannerImage from './sections/BannerImage';
import Spacer from '@/components/shuttle-detail/components/Spacer';

const DemandWrite = () => {
  const { back } = useRouter();

  return (
    <>
      <AppBar handleBack={back}>수요 신청하기</AppBar>
      <main>
        <BannerImage />
        <WriteForm />
        <Spacer />
      </main>
    </>
  );
};

export default DemandWrite;
