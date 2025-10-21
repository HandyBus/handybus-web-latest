import Button from '@/components/buttons/button/Button';

const SubmitSection = () => {
  return (
    <>
      <div className="flex-1" />
      <section className="p-16">
        <Button type="button" variant="primary" size="large">
          탑승권 받기
        </Button>
      </section>
    </>
  );
};

export default SubmitSection;
