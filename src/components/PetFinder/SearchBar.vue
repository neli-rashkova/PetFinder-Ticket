<template>
  <div class="w-full h-[14rem] bg-orange-500 relative md:h-[7rem]">
    <div
      class="absolute w-[90%] h-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded md:w-3/4 md:h-[35%] md:top-24 md:p-1 md:bg-white lg:w-[55%]"
    >
      <div
        class="w-full h-full flex flex-wrap items-center justify-center md:flex-row"
      >
        <input
          class="w-full h-1/4 px-3 rounded placeholder:uppercase placeholder:text-[10px] md:w-[55%] md:h-full lg:w-[57%] lg:placeholder:text-xs xl:placeholder:text-sm"
          placeholder="Enter your American location zip code, example 10005"
          v-model="location"
          aria-required="true"
        />

        <select
          aria-required="true"
          v-model="animalType"
          class="w-full h-1/4 px-3 rounded bg-gray-200 md:w-[32%] md:h-full md:rounded-none lg:w-[31%] xl:w-[33%]"
        >
          <option disabled value="">Select Pet</option>
          <option>Cat</option>
          <option>Dog</option>
          <option>Rabbit</option>
          <option>Bird</option>
        </select>

        <SmallButton label="Search" @handleEvent="getPets" />

        <RegularButton label="Search" @handleEvent="getPets" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
import { usePetDataStore } from "../../stores/PetDataStore";
import { usePageCountStore } from "../../stores/PageCountStore";
import { useInputStore } from "../../stores/InputStore";
import SmallButton from "../Buttons/SmallButton.vue";
import RegularButton from "../Buttons/RegularButton.vue";
import type Pet from "../../stores/PetDataStore";

const store = usePetDataStore();
const count = usePageCountStore();
const inputStore = useInputStore();
const { pageCount } = storeToRefs(count);
const { location } = storeToRefs(inputStore);
const { animalType } = storeToRefs(inputStore);

const petFinderKey = "MoeWtb2AXMkm0UpB9CZqsSN4OYVc9OdulnDB9h6AF4jZses8Gd";
const petFinderSecret = "m35MTTkGg68TTq5S2FnKToUOdbQJIyLr508zrR9p";
const httpToken = "https://api.petfinder.com/v2/oauth2/token";
const key = `grant_type=client_credentials&client_id=${petFinderKey}&client_secret=${petFinderSecret}`;
const token = ref("");
const id = ref(0);

async function getPets() {
  try {
    const res = await axios.post(httpToken, key);
    token.value = res.data.access_token;
    getPetData();
  } catch (err) {
    console.log(err);
  }
}

const petDataUrl = computed(
  () =>
    `https://api.petfinder.com/v2/animals?type=${animalType.value}&country=US&location=${location.value}&page=${count.pageCount}`
);

async function getPetData() {
  try {
    const res = await axios.get(petDataUrl.value, {
      headers: { Authorization: `Bearer ${token.value}` },
    });

    let temp = res.data.animals;
    count.totalCount = res.data.pagination.total_pages;

    for (let i = 0; i < temp.length; i++) {
      store.pets.push({
        id: id.value,
        age: temp[i].age,
        gender: temp[i].gender,
        name: temp[i].name,
        breed: temp[i].breeds.primary,
        distance: temp[i].distance,
        photo: temp[i].photos[0],
      });
      id.value++;
    }

    if (!Object.hasOwn(store.petsDataObj, [pageCount])) {
      store.petsDataObj[count.pageCount] = store.pets;
    }
  } catch (err) {
    console.log(err);
  }
}

/* If either input changes, current  search is cleared. Else current search is not cleared.*/
watch(
  [location, animalType, pageCount],
  (
    [newLocation, newAnimalType, newPageCount],
    [prevLocation, prevAnimalType, prevPageCount]
  ) => {
    let areInputsNotChanged =
      newLocation === prevLocation && newAnimalType === prevAnimalType;

    if (newLocation !== prevLocation || newAnimalType !== prevAnimalType) {
      store.$reset();
      count.$reset();
    } else if (
      areInputsNotChanged &&
      Object.keys(store.petsDataObj).length > 0
    ) {
      store.pets = [];
      if (newPageCount > prevPageCount) {
        /* if key exists, array of PetData will be displayed, if not then GetPets function is called to fetch data from API*/
        if (Object.hasOwn(store.petsDataObj, [newPageCount])) {
          store.petsDataObj[newPageCount].forEach((item: Pet) =>
            store.pets.push(item)
          );
        } else {
          getPets();
        }
      } else if (newPageCount < prevPageCount) {
        store.petsDataObj[newPageCount].forEach((item: Pet) =>
          store.pets.push(item)
        );
      }
    }
  }
);
</script>
