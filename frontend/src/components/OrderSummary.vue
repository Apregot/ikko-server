<script setup>
import { computed } from 'vue';
import { useOrderStore } from '@/stores/order.js';
import { useItemStore } from '@/stores/item.js';
import { useModifierStore } from '@/stores/modifier.js';

const orderStore = useOrderStore();
const itemStore = useItemStore();
const modifierStore = useModifierStore();

// order render
const orderItems = computed(() => {
  return orderStore.orderItems.map((orderItem) => {
    return {
      item: itemStore.itemById(orderItem.itemId),
      ...orderItem,
    };
  });
});

const getFormattedModifiersForItem = (item) => {
  if (item.modifiers.length === 0)
  {
    return '';
  }

  let result = '';
  item.modifiers.forEach((modifierId, index) => {
    if (index > 0)
    {
      result += ' ';
    }
    result += `(${modifierStore.modifierNameById(modifierId)})`;
  });

  return result;
};
// end order render
</script>

<template>
  <div class="order__container">
    <div v-for="orderItem in orderItems" class="order__item">
      {{ orderItem.item.title }} {{ getFormattedModifiersForItem(orderItem) }}
    </div>
  </div>
</template>

<style>
.order__container {
  padding-top: 50px;
  padding-left: 15px;
}

.order__item {
  margin-bottom: 5px;
}
</style>