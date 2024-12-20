import { ReactNode } from 'react';
import Divider from './Divider';

interface Props {
  children: ReactNode;
  title: string;
}

const Section = ({ children, title }: Props) => {
  return (
    <>
      <Divider />
      <section className="w-full px-16 py-32 text-16 font-400 text-grey-900">
        <h3 className="mb-8 line-clamp-1 h-32 text-22 font-700">{title}</h3>
        {children}
      </section>
    </>
  );
};

export default Section;
