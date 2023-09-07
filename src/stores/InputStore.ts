import { defineStore } from "pinia";

export type Location = {
  location: number | undefined;
};

export const useInputStore = defineStore({
  id: "InputStore",
  state: () => {
    return {
      location: undefined as Location,
      animalType: "",
    };
  },
});
