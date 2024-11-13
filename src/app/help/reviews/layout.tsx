import type { PropsWithChildren } from 'react';

import AppBar from '@/components/app-bar/AppBar';
import Article from '@/components/article/Article';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AppBar>전체 후기</AppBar>
      <Article
        className="flex flex-col gap-24 px-16"
        richTitle={
          <>
            핸디버스의
            <br />
            생생한 후기를 살펴보세요
          </>
        }
      >
        {children}
      </Article>
    </>
  );
};

export default Layout;
