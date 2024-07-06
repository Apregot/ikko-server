<script setup>
import PositionUnavailableIcon from '@/components/icons/PositionUnavailableIcon.vue';

defineProps(['items']);
const emit = defineEmits(['click']);

const onClick = (item) => {
  if (!item.available)
  {
    return;
  }
  emit('click', item);
};
</script>

<template>
  <div class="popup__container">
    <div class="popup__title">Модификаторы</div>
    <div v-for="item in items" @click="onClick(item)" class="popup__item" :class="{'--disabled': !item.available}">
      <div class="popup__item_plus">+</div>
      <div class="popup__item_text">
        {{ item.title }}
        <div v-if="!item.available" class="popup__unavailable-icon">
          <PositionUnavailableIcon />
        </div>
      </div>
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

.popup__item.--disabled {
  background: transparent;
}

.popup__item.--disabled .popup__item_text {
  color: #fff;
}

.popup__item.--disabled .popup__item_plus {
  color: #fff;
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
  position: relative;
  flex-grow: 1;
  text-align: center;
  color: #333858;
}

.popup__unavailable-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
}
</style>