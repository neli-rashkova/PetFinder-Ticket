import type { Meta, StoryObj } from "@storybook/vue3";

import RegularButton from "./RegularButton.vue";

import { action } from "@storybook/addon-actions";

const meta: Meta<typeof RegularButton> = {
  component: RegularButton,
};

export default meta;
type Story = StoryObj<typeof RegularButton>;

export const Button: Story = {
  render: (args) => ({
    components: { RegularButton },
    setup() {
      return {
        ...args,
        onClick: action("clicked"),
      };
    },
    template: '<RegularButton @click="onClick" :label="label" />',
  }),
  args: {
    label: "Search",
  },
};
