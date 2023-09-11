import { defineStore } from "pinia";

export default interface Pet {
  id: number;
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

export interface PetsObj {
  [pageCount: number]: Pet[];
}

export const usePetDataStore = defineStore({
  id: "PetDataStore",
  state: () => {
    return {
      pets: [] as Pet[],

      petsDataObj: {} as PetsObj,
    };
  },
});
