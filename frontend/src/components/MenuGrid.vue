<script setup>
import { computed, ref } from 'vue';
import { useItemStore } from '@/stores/item.js';
import { useModifierStore } from '@/stores/modifier.js';
import { useOrderStore } from '@/stores/order.js';
import { ModifierType } from '@/const/modificator.js';

import MenuItem from '@/components/MenuItem.vue';
import ModifierPopup from '@/components/ModifierPopup.vue';

const itemStore = useItemStore();
const modifierStore = useModifierStore();
const orderStore = useOrderStore();

// list render
const items = computed(() => {
  return Object.values(itemStore.collection);
});
// end list render

// click handler
const selectedItemId = ref(0);
const selectedMilkId = ref(0);

const onItemClick = (item) => {
  selectedItemId.value = item.id;
  const milks = modifierStore.modifiersByType(item.modifiers ?? [], ModifierType.milk);
  const cups = modifierStore.modifiersByType(item.modifiers ?? [], ModifierType.cup);
  if (milks.length === 0 && cups.length === 0)
  {
    orderStore.addItem({
      itemId: item.id,
      modifiers: [],
    });

    return;
  }
  milkModifiers.value = milks;
  cupModifiers.value = cups;
};
// end click handler

// modifiers selection
const milkModifiers = ref([]);
const cupModifiers = ref([]);
const showMilkPopup = computed(() => {
  return milkModifiers.value.length > 0;
});

const showCupPopup = computed(() => {
  return cupModifiers.value.length > 0;
});

const onMilkSelect = (milk) => {
  console.error('milk', milk.title, 'added');
  if (cupModifiers.value.length === 0)
  {
    orderStore.addItem({
      itemId: selectedItemId.value,
      modifiers: [milk.id],
    });
    selectedMilkId.value = 0;
  }
  else
  {
    selectedMilkId.value = milk.id;
  }

  milkModifiers.value = [];
};

const onCupSelect = (cup) => {
  console.error('cup', cup.title, 'added');
  const finalModifiers = [];
  if (selectedMilkId.value > 0)
  {
    finalModifiers.push(selectedMilkId.value);
  }
  finalModifiers.push(cup.id);
  orderStore.addItem({
    itemId: selectedItemId.value,
    modifiers: finalModifiers,
  });
  selectedMilkId.value = 0;

  cupModifiers.value = [];
};
// end modifiers selection
</script>

<template>
  <div class="menu__container">
    <MenuItem v-for="item in items" @click="onItemClick" :item="item" />
  </div>
  <ModifierPopup v-if="showMilkPopup" @click="onMilkSelect" :items="milkModifiers" />
  <ModifierPopup v-else-if="showCupPopup" @click="onCupSelect" :items="cupModifiers"  />
</template>

<style>
  .menu__container {
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    background: #eee;
  }
</style>