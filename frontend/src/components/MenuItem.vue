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

.item__container.--disabled {
  background: #fdcfcf;
}
</style>