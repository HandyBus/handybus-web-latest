import Accordion from '@/components/accordion/Accordion';
import Guideline from '@/components/guidelines/Guideline';

const GuidelineSection = () => {
  return (
    <section>
      <Accordion
        title="상품별 유의사항"
        containerClassName="bg-basic-grey-50"
        titleClassName="text-16 font-600"
        open={true}
      >
        <section className="py-16">
          <h6 className="mb-8 text-18 font-600">주요 참고사항</h6>
          <Guideline type="주요 참고사항" />
        </section>
        <section className="py-16">
          <h6 className="mb-8 text-18 font-600">상품별 유의사항</h6>
          <Guideline type="상품별 유의사항" />
        </section>
      </Accordion>
    </section>
  );
};

export default GuidelineSection;
