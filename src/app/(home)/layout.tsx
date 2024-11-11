import type { ReactNode } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

interface Props {
  demands: ReactNode;
  reservations: ReactNode;
  top: ReactNode;
  bot: ReactNode;
}

export default function WithFooterLayout({
  demands,
  top,
  bot,
  reservations,
}: Readonly<Props>) {
  return (
    <div className="flex h-full flex-grow flex-col">
      <Header />
      <main className="w-full flex-grow pb-12">
        {top}
        {reservations}
        {demands}
        {bot}
      </main>
      <Footer />
    </div>
  );
}
