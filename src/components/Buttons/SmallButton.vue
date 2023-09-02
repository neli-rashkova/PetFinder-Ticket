<template>
  <button
    class="w-2/5 bg-orange-500 rounded uppercase font-semibold tracking-wide border border-black active:bg-orange-300"
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
