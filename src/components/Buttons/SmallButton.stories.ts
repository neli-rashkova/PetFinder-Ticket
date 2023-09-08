import type { Meta, StoryObj } from "@storybook/vue3";

import SmallButton from "./SmallButton.vue";

import { action } from "@storybook/addon-actions";

const meta: Meta<typeof SmallButton> = {
  component: SmallButton,
  argTypes: {
    label: String,
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof SmallButton>;

export const Button: Story = {
  render: (args) => ({
    components: { SmallButton },
    setup() {
      return {
        ...args,
        onClick: action("clicked"),
      };
    },
    template: '<SmallButton @click="() =>({})" :label="label" />',
  }),
  args: {
    label: "Search",
  },
};
