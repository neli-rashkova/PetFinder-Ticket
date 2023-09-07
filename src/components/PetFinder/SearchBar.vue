<template>
  <div class="w-full h-[14rem] bg-orange-500 relative md:h-[7rem]">
    <div
      class="absolute w-[90%] h-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded md:w-3/4 md:h-[35%] md:top-24 md:p-1 md:bg-white lg:w-[55%]"
    >
      <div
        class="w-full h-full flex flex-wrap items-center justify-center md:flex-row"
      >
        <input
          class="w-full h-1/4 px-3 rounded placeholder:uppercase md:w-[55%] md:h-full"
          placeholder="Enter your location zip code"
          v-model="location"
          aria-required="true"
        />

        <select
          aria-required="true"
          v-model="animalType"
          class="w-full h-1/4 px-3 rounded bg-gray-200 md:w-[30%] md:h-full md:rounded-none"
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

// const location = ref<number | undefined>(undefined);
// const selected = ref("");
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
    console.log("results: ", res.data);
    console.log(temp);
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
  } catch (err) {
    console.log(err);
  }
}

watch(pageCount, (newPageCount, prevPageCount) => {
  if (newPageCount > prevPageCount || newPageCount === prevPageCount) {
    getPets();
  }
});

watch(
  [location, animalType],
  ([newLocation, newAnimalType], [prevLocation, prevAnimalType]) => {
    if (newLocation !== prevLocation || newAnimalType !== prevAnimalType) {
      store.$reset();
      count.$reset();
    }
  }
);
</script>
