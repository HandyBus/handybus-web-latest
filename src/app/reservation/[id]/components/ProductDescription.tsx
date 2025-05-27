import Image from 'next/image';
import productDescription1 from './images/product-desc-top.png';
import productDescription2 from './images/product-desc-bottom.png';

interface Props {
  routeName?: string;
  eventName?: string;
}

const ProductDescription = ({ routeName, eventName }: Props) => {
  return (
    <div>
      <div className="h-[8px] bg-grey-50" />
      <Image src={productDescription1} alt="product-description-1" />
      <h6 className="px-28 py-32 text-center text-20 font-700 leading-[140%]">
        현재 이 상품은 <br /> [{routeName}] {eventName} 입니다.
      </h6>
      <Image src={productDescription2} alt="product-description-2" />
      <div className="h-[8px] bg-grey-50" />
    </div>
  );
};

export default ProductDescription;
