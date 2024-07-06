<script setup>
import { computed } from 'vue';

defineProps(['item']);
defineEmits(['click']);
</script>

<template>
  <div @click="$emit('click', item)" class="item__container">
    {{ item.title }}
  </div>
</template>

<style>
.item__container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100px;
  height: 50px;
  border: 1px solid lightgray;
  font-size: 13px;
  cursor: pointer;
  background: #ccc;
}

.item__container:hover {
  background: #ddd;
}
</style>