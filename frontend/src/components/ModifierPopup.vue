<script setup>
defineProps(['items']);
defineEmits(['click']);
</script>

<template>
  <div class="popup__container">
    <div v-for="item in items" @click="$emit('click', item)" class="popup__item">
      {{ item.title }}
    </div>
  </div>
</template>

<style>
.popup__container {
  position: absolute;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  background: lightblue;
}

.popup__item {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  background: #fff;
  cursor: pointer;
}

.popup__item:hover {
  background: #eee;
}
</style>