import type { PropsWithChildren } from 'react';
import ArticleV1 from '@/components/article/ArticleV1';
import Header from '@/components/header/Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <ArticleV1
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
      </ArticleV1>
    </>
  );
};

export default Layout;
