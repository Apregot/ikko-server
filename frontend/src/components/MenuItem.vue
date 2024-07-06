<script setup>
import { computed } from 'vue';
import PositionUnavailableIcon from '@/components/icons/PositionUnavailableIcon.vue';

const props = defineProps(['item']);
const emit = defineEmits(['click']);

const onClick = () => {
  if (!props.item.available)
  {
    return;
  }

  emit('click', props.item);
};
</script>

<template>
  <div @click="onClick" class="item__container" :class="{'--disabled': !item.available}">
    {{ item.title }}
    <div v-if="!item.available" class="item__unavailable-icon">
      <PositionUnavailableIcon />
    </div>
  </div>
</template>

<style>
.item__container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 120px;
  height: 60px;
  border: 1px solid #000;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  background: #999DBD;
}

.item__container:hover {
  background: #898da9;
}

.item__container.--disabled {
  //background: #fdcfcf;
}

.item__unavailable-icon {
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