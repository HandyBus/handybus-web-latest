import { Meta, StoryObj } from '@storybook/react';
import SelectModal from './SelectModal';

const meta: Meta<typeof SelectModal> = {
  title: 'Components/Modal/SelectModal',
  component: SelectModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SelectModal>;

export const Primary: Story = {
  args: {},
};
