import Accordion from '@/components/accordion/Accordion';
import Guideline from '@/components/guidelines/Guideline';

const EventGuidelines = () => {
  return (
    <Accordion
      title="꼭 알아두세요"
      containerClassName="bg-basic-grey-50"
      openedByDefault
    >
      <section className="py-16">
        <h6 className="mb-8 text-18 font-600">수요조사</h6>
        <Guideline type="수요조사" />
      </section>
      <section className="py-16">
        <h6 className="mb-8 text-18 font-600">취소 및 환불 안내</h6>
        <Guideline type="취소 및 환불 안내" />
      </section>
      <section className="py-16">
        <h6 className="mb-8 text-18 font-600">유의사항</h6>
        <Guideline type="유의사항" />
      </section>
    </Accordion>
  );
};

export default EventGuidelines;
