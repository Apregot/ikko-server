<script setup>
  import StartDayIcon from '@/components/icons/StartDayIcon.vue';

</script>

<template>
  <div class="start-day-button__container">
    <StartDayIcon />
    <div class="start-day-button__text">Продолжить</div>
  </div>
</template>

<style>
.start-day-button__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: #fff;
}

.start-day-button__container:hover {
  background: #111;
}

.start-day-button__text {
  margin-top: 5px;
}
</style>