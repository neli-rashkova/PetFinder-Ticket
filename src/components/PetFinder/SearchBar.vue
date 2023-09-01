<template>
  <div class="w-full h-[14rem] bg-orange-500 relative md:h-[7rem]">
    <div
      class="absolute w-[90%] h-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-full"
    >
      <div class="w-full h-full flex flex-wrap items-center">
        <input
          class="w-full h-1/4 px-3 rounded placeholder:uppercase"
          placeholder="Enter your location zip code"
          v-model="location"
          aria-required="true"
        />
        <select
          aria-required="true"
          v-model="selected"
          class="w-full h-1/4 px-3 rounded"
        >
          <option disabled value="">Please select one</option>
          <option>Cat</option>
          <option>Dog</option>
          <option>Rabbit</option>
          <option>Bird</option>
        </select>

        <div class="w-full h-1/4 flex justify-evenly gap-3 py-1">
          <button
            class="w-1/2 bg-orange-500 rounded uppercase font-semibold border border-black"
          >
            Clear
          </button>
          <button
            class="w-1/2 bg-orange-500 rounded uppercase font-semibold border border-black"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const location = ref<number>();
const selected = ref("");
</script>
