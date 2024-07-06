<script setup>
defineProps(['items']);
defineEmits(['click']);
</script>

<template>
  <div class="popup__container">
    <div class="popup__title">Модификаторы</div>
    <div v-for="item in items" @click="$emit('click', item)" class="popup__item">
      <div class="popup__item_plus">+</div>
      <div class="popup__item_text">{{ item.title }}</div>
    </div>
  </div>
</template>

<style>
.popup__title {
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
}

.popup__container {
  position: absolute;
  width: 700px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background: #333858;
  border: 1px solid black;
  padding: 20px;
}

.popup__item {
  width: 50%;
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background: #fff;
  cursor: pointer;
}

.popup__item:hover {
  background: #eee;
}

.popup__item_plus {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  font-size: 42px;
  color: #333858;
  border-right: 5px solid #333858;
}

.popup__item_text {
  flex-grow: 1;
  text-align: center;
  color: #333858;
}
</style>