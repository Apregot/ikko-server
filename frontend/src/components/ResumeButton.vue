<script setup>
  import ResumeDayIcon from '@/components/icons/ResumeDayIcon.vue';
</script>

<template>
  <div class="resume-day-button__container">
    <ResumeDayIcon />
    <div class="resume-day-button__text">Продолжить</div>
  </div>
</template>

<style>
.resume-day-button__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: #fff;
}

.resume-day-button__container:hover {
  background: #111;
}

.resume-day-button__text {
  margin-top: 5px;
}
</style>