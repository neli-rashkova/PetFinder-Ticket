<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full h-full">
    <SearchBar />
    <DisplayPetsList />
  </div>
</template>

<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import DisplayPetsList from "./DisplayPetsList.vue";
</script>
