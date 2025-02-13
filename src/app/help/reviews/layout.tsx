import type { PropsWithChildren } from 'react';
import Article from '@/components/article/Article';
import Header from '@/components/header/Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
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
