import Accordion from '@/components/accordion/Accordion';
import Guideline from '@/components/guidelines/Guideline';

const GuidelineSection = () => {
  return (
    <section>
      <Accordion
        title="취소 및 환불 안내"
        containerClassName="bg-basic-grey-50"
        titleClassName="text-16 font-600"
      >
        <Guideline type="취소 및 환불 안내" />
      </Accordion>
      <Accordion
        title="유의사항"
        containerClassName="bg-basic-grey-50"
        titleClassName="text-16 font-600"
      >
        <Guideline type="유의사항" />
      </Accordion>
    </section>
  );
};

export default GuidelineSection;
