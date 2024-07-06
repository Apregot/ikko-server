<script setup>
import EndDayIcon from '@/components/icons/EndDayIcon.vue';

</script>

<template>
  <div class="end-day-button__container">
    <EndDayIcon />
    <div class="end-day-button__text">Закончить смену</div>
  </div>
</template>

<style>
.end-day-button__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: #fff;
}

.end-day-button__container:hover {
  background: #111;
}

.end-day-button__text {
  margin-top: 5px;
}
</style>