import { defineStore } from "pinia";

export const usePetDataStore = defineStore("PetDataStore", {
  state: () => {
    return {
      pets: pets,
    };
  },
});
