import type { Meta, StoryObj } from "@storybook/vue3";
import Main from "./Main.vue";

const meta: Meta<typeof Main> = {
  component: Main,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Main>;

export const Default: Story = {
  render: (args) => ({
    components: { Main },
    setup() {
      return {
        ...args,
      };
    },
    template: "<Main />",
  }),
};
