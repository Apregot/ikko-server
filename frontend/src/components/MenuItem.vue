<script setup>
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
  </div>
</template>

<style>
.item__container {
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
  background: #fdcfcf;
}
</style>