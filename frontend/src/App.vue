<script setup>
import { computed } from 'vue';
import { useItemStore } from '@/stores/item.js';

const itemStore = useItemStore();
const items = computed(() => {
  return Object.values(itemStore.collection);
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/igor.jpeg" width="125" height="125" />
  </header>
  <div v-for="item in items">{{ item.title }}</div>
</template>

<style scoped>

</style>
