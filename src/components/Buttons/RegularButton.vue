<template>
  <button
    @click="btnClicked"
    class="hidden md:w-[13%] md:h-full md:bg-orange-500 md:flex md:items-center md:justify-around md:text-xs md:px-[6px] md:text-white lg:w-[12%] xl:w-[10%] xl:justify-evenly"
  >
    <Icon
      icon="foundation:magnifying-glass"
      color="white"
      :horizontalFlip="true"
    />
    <span class="text-xs">{{ props.label }}</span>
  </button>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps({
  label: { type: String, required: true },
});

const emit = defineEmits(["handleEvent"]);

function btnClicked() {
  emit("handleEvent");
}
</script>
