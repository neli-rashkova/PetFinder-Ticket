<template>
  <div
    class="bg-white w-full h-[31.3rem] rounded md:w-[93%] md:h-[34rem] xl:w-[85%] xl:h-[30rem]"
  >
    <img
      v-if="props.image?.length > 0"
      class="w-full h-[75%] rounded-t"
      :src="props.image"
    />
    <div
      v-else
      class="w-full h-[75%] rounded-t flex justify-center items-center"
    >
      <span class="text-[6rem] w-fit h-fit">&#128062;</span>
    </div>
    <section class="w-full h-1/4 px-4 pt-3 pb-2 flex flex-col justify-around">
      <div class="flex flex-col">
        <span class="text-lg font-semibold line-clamp-1">{{ props.name }}</span>
        <span class="text-gray-700 text-sm">{{ props.breed }}</span>
      </div>
      <div class="flex justify-between items-center">
        <div
          class="bg-orange-200 py-1 px-3 text-sm font-semibold text-orange-900 rounded-full"
        >
          {{ props.age }} | {{ props.gender }}
        </div>
        <div class="text-sm text-gray-600">
          {{ Math.round(props.distance * 10) / 10 }} miles Away
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: String,
  name: String,
  breed: String,
  age: String,
  gender: String,
  distance: Number,
});
</script>
