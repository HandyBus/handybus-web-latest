import Button from '@/components/buttons/button/Button';
import Section from '../Section';

const HandySection = () => {
  return (
    <Section
      heading={
        <>
          <span>핸디 지원</span>
          <Button variant="tertiary" size="small">
            알아보기
          </Button>
        </>
      }
    >
      <div className="flex h-36 w-full justify-center rounded-8 bg-basic-grey-50 p-8 text-center">
        <span className="text-12 font-600 text-basic-grey-500">
          핸디는 왕복만 지원할 수 있어요.
        </span>
      </div>
    </Section>
  );
};

export default HandySection;
