import type { ReactNode } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

interface Props {
  top: ReactNode;
  bot: ReactNode;
  reservation: ReactNode;
  demand: ReactNode;
}

export default function WithFooterLayout({
  top,
  bot,
  reservation,
  demand,
}: Readonly<Props>) {
  return (
    <div className="flex h-full flex-grow flex-col">
      <Header />
      <main className="w-full flex-grow pb-12">
        {top}
        {reservation}
        {demand}
        {bot}
      </main>
      <Footer />
    </div>
  );
}
