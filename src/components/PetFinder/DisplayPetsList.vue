<template>
  <div class="w-full h-[calc(100vh-230px)] md:h-[calc(100vh-7rem)]">
    <div
      class="w-full h-[93%] flex flex-col justify-between items-center pt-2 gap-1 md:pt-4"
    >
      <div
        v-if="store.pets.length > 0"
        class="w-[90%] h-[10%] flex flex-col items-center"
      >
        <h5 class="w-fit text-xl font-bold md:text-3xl">
          Search {{ inputStore.animalType }}
        </h5>
        <h3 class="w-fit text-sm text-gray-700 md:text-base">
          Results for {{ inputStore.animalType.toLowerCase() }} near
          {{ inputStore.location }}
        </h3>
      </div>
      <div
        class="w-[90%] h-[90%] grid grid-cols-1 auto-rows-auto gap-y-5 justify-items-center md:grid-cols-2 md:w-[95%] md:gap-y-4 lg:grid-cols-3 lg:gap-x-2 lg:gap-y-7 xl:grid-cols-4 xl:gap-x-0 xl:gap-y-14"
        :class="showScrollBar ? 'overflow-y-scroll' : 'overflow-y-hidden'"
        @scroll="disableScrolling()"
        @mousewheel="enableScrolling()"
        @click="enableScrolling()"
        @mousemove="enableScrolling()"
      >
        <PetCard
          v-for="pet in store.pets"
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
import { ref } from "vue";

const store = usePetDataStore();
const count = usePageCountStore();
const inputStore = useInputStore();
const showScrollBar = ref(false);

function disableScrolling() {
  setTimeout(() => {
    showScrollBar.value = false;
  }, 1000);
}

function enableScrolling() {
  showScrollBar.value = true;
}
</script>
