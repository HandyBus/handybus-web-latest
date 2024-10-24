import Footer from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export default meta;

export const Primary = {
  args: {
    children: 'Button',
    backgroundColor: '#fff',
  },
};
