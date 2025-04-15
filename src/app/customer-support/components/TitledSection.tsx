import { PropsWithChildren } from 'react';

interface TitledSectionProps extends PropsWithChildren {
  title?: string;
}

const TitledSection = ({ title, children }: TitledSectionProps) => {
  return (
    <section className="px-16 py-24">
      {title && (
        <h2 className="whitespace-pre-line pb-16 text-18 font-700 leading-[140%]">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};

export default TitledSection;
