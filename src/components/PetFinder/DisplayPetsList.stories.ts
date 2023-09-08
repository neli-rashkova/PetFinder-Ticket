import type { Meta, StoryObj } from "@storybook/vue3";

import DisplayPetsList from "./DisplayPetsList.vue";

const meta: Meta<typeof DisplayPetsList> = {
  component: DisplayPetsList,
};

export default meta;
type Story = StoryObj<typeof DisplayPetsList>;

export const List: Story = {
  render: (args) => ({
    components: { DisplayPetsList },
    setup() {
      return {
        ...args,
      };
    },
    template: "<DisplayPetsList />",
  }),
};
