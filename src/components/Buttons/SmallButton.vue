<template>
  <button
    class="w-1/2 h-[20%] bg-orange-500 rounded uppercase font-semibold tracking-wide border border-black text-lg active:bg-orange-300 md:hidden"
    @click="btnClicked"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
});

const emit = defineEmits(["handleEvent"]);

function btnClicked() {
  emit("handleEvent");
}
</script>
