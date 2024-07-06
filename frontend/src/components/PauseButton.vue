<script setup>
import PauseDayIcon from '@/components/icons/PauseDayIcon.vue';

</script>

<template>
  <div class="pause-day-button__container">
    <PauseDayIcon />
    <div class="pause-day-button__text">Пауза</div>
  </div>
</template>

<style>
.pause-day-button__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: #fff;
}

.pause-day-button__container:hover {
  background: #111;
}

.pause-day-button__text {
  margin-top: 5px;
}
</style>