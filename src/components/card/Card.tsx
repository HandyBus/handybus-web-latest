import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

type Props = {
  title: string;
  description: string;
  image: StaticImport | string;
};

const Card = ({ title, description, image }: Props) => {
  return (
    <section
      className="overflow-hidden rounded-[10px] shadow-sm"
      style={{ boxShadow: '0px 1px 9px rgba(0, 0, 0, 0.12)' }}
    >
      <div>
        <Image src={image} alt={title} />
      </div>
      <div className="flex flex-col items-start gap-4 p-24 ">
        <h2 className="text-18 font-700 text-grey-900">{title}</h2>
        <p className="text-14 font-400 text-grey-600-sub">{description}</p>
      </div>
    </section>
  );
};

export default Card;
