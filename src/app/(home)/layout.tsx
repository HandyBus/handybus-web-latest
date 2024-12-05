import type { ReactNode } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

interface Props {
  demand: ReactNode;
  shuttle: ReactNode;
  top: ReactNode;
  bot: ReactNode;
}

export default function WithFooterLayout({
  demand,
  top,
  bot,
  shuttle,
}: Readonly<Props>) {
  return (
    <div className="flex h-full flex-grow flex-col">
      <Header />
      <main className="w-full flex-grow pb-12">
        {top}
        {demand}
        {shuttle}
        {bot}
      </main>
      <Footer />
    </div>
  );
}
