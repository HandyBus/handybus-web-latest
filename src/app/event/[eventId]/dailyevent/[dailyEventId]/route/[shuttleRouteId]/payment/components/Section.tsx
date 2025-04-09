import { ReactNode } from 'react';
import Divider from './Divider';

interface Props {
  heading: ReactNode;
  children: ReactNode;
}

const Section = ({ heading, children }: Props) => {
  return (
    <>
      <Divider />
      <section className="flex flex-col gap-16 px-16 py-24">
        <h2 className="flex items-center justify-between text-16 font-600 leading-[160%]">
          {heading}
        </h2>
        {children}
      </section>
    </>
  );
};

export default Section;
