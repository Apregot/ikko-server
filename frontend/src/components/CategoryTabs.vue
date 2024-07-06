<script setup>
import { computed } from 'vue';
import { useCategoryStore } from '@/stores/category.js';

const props = defineProps(['activeTabId']);
defineEmits(['click']);

const categoryStore = useCategoryStore();

const categories = computed(() => {
  return Object.values(categoryStore.collection);
});
</script>

<template>
  <div class="categories__container">
    <div
        v-for="category in categories"
        @click="$emit('click', category)"
        :key="category.title"
        class="categories__item"
        :class="{'--active': category.id === props.activeTabId}"
    >
      {{ category.title }}
    </div>
  </div>
</template>

<style>
.categories__container {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  background: #eee;
}

.categories__item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 120px;
  height: 60px;
  cursor: pointer;
  background: #8181e7;
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: bold;
}

.categories__item:hover {
  background: #5252e3;
}

.categories__item.--active {
  background: #acccac;
  color: #000;
}
</style>