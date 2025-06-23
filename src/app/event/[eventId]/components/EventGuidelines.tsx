import Accordion from '@/components/accordion/Accordion';
import Guideline from '@/components/guidelines/Guideline';

const EventGuidelines = () => {
  return (
    <Accordion
      title="꼭 알아두세요"
      containerClassName="bg-basic-grey-50"
      open={true}
    >
      <section className="py-16">
        <h6 className="mb-8 text-18 font-600">수요조사</h6>
        <Guideline type="수요조사" />
      </section>
      <section className="py-16">
        <h6 className="mb-8 text-18 font-600">문의</h6>
        <Guideline type="문의" />
      </section>
      <section className="py-16">
        <h6 className="mb-8 text-18 font-600">상품별 유의사항</h6>
        <Guideline type="상품별 유의사항" />
      </section>
    </Accordion>
  );
};

export default EventGuidelines;
