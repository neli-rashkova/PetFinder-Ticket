import type { Meta, StoryObj } from "@storybook/vue3";

import SearchBar from "./SearchBar.vue";
import RegularButton from "../Buttons/RegularButton.vue";
import SmallButton from "../Buttons/SmallButton.vue";

import { action } from "@storybook/addon-actions";

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const SearchBarWithSmallButton: Story = {
  render: (args) => ({
    components: { SearchBar, SmallButton },
    setup() {
      return {
        ...args,
        onClick: action("clicked"),
      };
    },
    template: `<SearchBar @click="() =>({})" />`,
  }),
};

export const SearchBarWithRegularButton: Story = {
  render: (args) => ({
    components: { SearchBar, RegularButton },
    setup() {
      return {
        ...args,
        onClick: action("clicked"),
      };
    },
    template: `<SearchBar @click="() =>({})" />`,
  }),
};
