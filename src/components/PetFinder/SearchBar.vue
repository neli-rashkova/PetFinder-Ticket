<template>
  <div class="w-full h-[14rem] bg-orange-500 relative md:h-[7rem]">
    <div
      class="absolute w-[90%] h-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-3/4 md:h-[35%] md:top-20 md:p-1 md:bg-white border border-black"
    >
      <div class="w-full h-full flex flex-wrap items-center md:flex-row">
        <input
          class="w-full h-1/4 px-3 rounded placeholder:uppercase md:w-[55%] md:h-full"
          placeholder="Enter your location zip code"
          v-model="location"
          aria-required="true"
        />

        <select
          aria-required="true"
          v-model="selected"
          class="w-full h-1/4 px-3 rounded bg-gray-200 md:w-[30%] md:h-full md:rounded-none"
        >
          <option disabled value="">Please select one</option>
          <option>Cat</option>
          <option>Dog</option>
          <option>Rabbit</option>
          <option>Bird</option>
        </select>

        <button class="md:w-[15%] md:h-full bg-orange-500">Search</button>
        <!-- <div class="w-full h-1/4 flex justify-evenly py-1">
          <SmallButton label="Clear" @handleEvent="clear" />
          <SmallButton label="Search" @handleEvent="submit" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SmallButton from "../Buttons/SmallButton.vue";

const location = ref<number | undefined>(undefined);
const selected = ref("");

function submit() {}

function clear() {
  location.value = undefined;
}
</script>
