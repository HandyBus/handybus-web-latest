import { Meta, StoryObj } from '@storybook/react';
import ViewAllButton from './ViewAllButton';

const meta: Meta<typeof ViewAllButton> = {
  title: 'Components/buttons/ViewAllButton',
  component: ViewAllButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ViewAllButton>;

export const Primary: Story = {
  args: {
    onClick: () => {},
  },
};
