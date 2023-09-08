import type { Meta, StoryObj } from "@storybook/vue3";

import PetCard from "./PetCard.vue";

const meta: Meta<typeof PetCard> = {
  component: PetCard,
  argTypes: {
    image: String,
    name: String,
    breed: String,
    age: String,
    gender: String,
    distance: Number,
  },
};

export default meta;
type Story = StoryObj<typeof PetCard>;

export const Button: Story = {
  render: (args) => ({
    components: { PetCard },
    setup() {
      return {
        ...args,
      };
    },
    template:
      '<PetCard :image="image" :name="name" :breed="breed" :age="age" :gender="gender" :distance="distance"/>',
  }),
  args: {
    image: "",
    name: "Fido",
    breed: "Border Collie",
    age: "Young",
    gender: "Male",
    distance: 10,
  },
};
