import { Meta, StoryObj } from '@storybook/react';
import RadioButtons from './RadioButtons';

const meta: Meta<typeof RadioButtons> = {
  title: 'Components/buttons/RadioButtons',
  component: RadioButtons,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RadioButtons>;

export const Primary: Story = {
  args: {
    values: ['여성', '남성'],
  },
};
