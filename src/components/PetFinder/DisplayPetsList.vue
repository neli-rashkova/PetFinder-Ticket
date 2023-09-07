<template>
  <div class="w-screen h-[calc(100vh-230px)] md:h-[calc(100vh-7rem)]">
    <div
      class="w-full h-[93%] flex flex-col justify-between items-center pt-2 gap-1"
    >
      <div
        v-if="store.pets.length > 0"
        class="w-[90%] h-[10%] flex flex-col items-center"
      >
        <h5 class="w-fit text-xl font-bold">
          Search {{ inputStore.animalType }}
        </h5>
        <h3 class="w-fit text-sm text-gray-700">
          Results for {{ inputStore.animalType.toLowerCase() }} near
          {{ inputStore.location }}
        </h3>
      </div>
      <div
        class="w-[90%] h-[90%] overflow-x-scroll grid grid-cols-1 auto-rows-auto gap-y-5 md:grid-cols-2 md:gap-x-3 md:w-[97%]"
      >
        <PetCard
          v-for="pet in itemsOnCurrentPage"
          :key="pet.id"
          :image="pet.photo?.medium"
          :name="pet.name"
          :breed="pet.breed"
          :age="pet.age"
          :gender="pet.gender"
          :distance="pet.distance"
        />
      </div>
    </div>

    <section
      v-if="store.pets.length > 0"
      class="w-full h-[7%] flex justify-center items-center gap-4 text-lg md:text-2xl"
    >
      <button class="font-semibold" @click="count.decrement">&lt;</button>
      <div class="font-semibold">
        <span class="text-orange-600 font-bold">{{ count.pageCount }}</span>
        /
        {{ count.totalCount }}
      </div>
      <button class="font-semibold" @click="count.increment">></button>
    </section>
  </div>
</template>

<script setup lang="ts">
import PetCard from "./PetCard.vue";
import { usePetDataStore } from "../../stores/PetDataStore";
import { usePageCountStore } from "../../stores/PageCountStore";
import { useInputStore } from "../../stores/InputStore";
import { computed } from "vue";

const store = usePetDataStore();
const count = usePageCountStore();
const inputStore = useInputStore();

const itemsOnCurrentPage = computed(() => {
  return store.pets.filter((el) => {
    if (
      el.id >= count.pageCount * 20 - 20 &&
      el.id <= count.pageCount * 20 - 1
    ) {
      return el;
    }
  });
});
</script>
