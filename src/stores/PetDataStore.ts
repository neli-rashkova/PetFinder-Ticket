import { defineStore } from "pinia";

interface Pet {
  age: string;
  gender: string;
  name: string;
  breed: string;
  distance: number;
  photo: Photo;
}

interface Photo {
  full: string;
  large: string;
  medium: string;
  small: string;
}

export type PetInfo = {
  pets: Pet[];
};

export const usePetDataStore = defineStore({
  id: "PetDataStore",
  state: () =>
    ({
      pets: [],
    } as PetInfo),
});
