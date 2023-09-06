<template>
  <div class="w-screen h-[calc(100vh-230px)]">
    <div class="w-full h-[90%] overflow-y-scroll flex justify-center pt-2">
      <div class="w-[90%] h-full grid grid-cols-1 auto-rows-auto gap-y-5">
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
      class="w-full h-[10%] flex justify-center items-center gap-4"
    >
      <button class="text-xl font-semibold" @click="count.decrement">
        &lt;
      </button>
      <div class="text-xl font-semibold">
        <span class="text-orange-600 font-bold">{{ count.pageCount }}</span>
        /
        {{ count.totalCount }}
      </div>
      <button class="text-xl font-semibold" @click="count.increment">></button>
    </section>
  </div>
</template>

<script setup lang="ts">
import PetCard from "./PetCard.vue";
import { usePetDataStore } from "../../stores/PetDataStore";
import { usePageCountStore } from "../../stores/PageCountStore";
import { computed, onUpdated } from "vue";

const store = usePetDataStore();
const count = usePageCountStore();

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

/* delete later*/
onUpdated(() => {
  console.log("T", store.pets);
});
</script>
