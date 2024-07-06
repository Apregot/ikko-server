<script setup>
import CachMachineIcon from '@/components/icons/CachMachineIcon.vue';
</script>

<template>
  <div class="order-button__container">
    <CachMachineIcon />
    <div class="order-button__text">Касса</div>
  </div>
</template>

<style>
  .order-button__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    color: #fff;
  }

  .order-button__container:hover {
    background: #111;
  }

  .order-button__text {
    margin-top: 5px;
  }
</style>