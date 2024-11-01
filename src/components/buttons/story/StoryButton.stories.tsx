import { StoryButton } from './StoryButton';

const meta = {
  title: 'MyComponent/StoryButton',
  component: StoryButton,
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
