import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
}

const Section = ({ children, title }: Props) => {
  return (
    <>
      <div className="h-8 w-full bg-grey-50" />
      <section className="px-16 py-32 text-16 font-400 text-grey-900">
        <h3 className="line-clamp-1 h-32 text-22 font-700">{title}</h3>
        {children}
      </section>
    </>
  );
};

export default Section;
