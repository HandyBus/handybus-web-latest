import Accordion from '@/components/accordion/Accordion';
import Guideline from '@/components/guidelines/Guideline';

const GuidelineSection = () => {
  return (
    <section>
      <Accordion
        title="주요 참고사항"
        containerClassName="bg-basic-grey-50"
        open={true}
      >
        <div className="pb-16">
          <Guideline type="주요 참고사항" />
        </div>
      </Accordion>
      <Accordion
        title="상품별 유의사항"
        containerClassName="bg-basic-grey-50"
        open={true}
      >
        <div className="pb-16">
          <Guideline type="상품별 유의사항" />
        </div>
      </Accordion>
    </section>
  );
};

export default GuidelineSection;
