<script setup>
import { ref } from 'vue';
import { ItemService } from '@/services/item.js';
import { OrderService } from '@/services/order.js';
import { WorkdayService } from '@/services/workday.js';
import { useOrderStore } from '@/stores/order.js';

import MenuGrid from '@/components/MenuGrid.vue';
import OrderSummary from '@/components/OrderSummary.vue';
import CreateOrderButton from '@/components/CreateOrderButton.vue';
import StartDayButton from '@/components/StartDayButton.vue';
import EndDayButton from '@/components/EndDayButton.vue';
import PauseButton from '@/components/PauseButton.vue';
import ResumeButton from '@/components/ResumeButton.vue';

const orderStore = useOrderStore();

// init
const isLoading = ref(false);
const fetchItems = async () => {
  isLoading.value = true;
  await ItemService.getItems();
  isLoading.value = false;
};

fetchItems();
// end init

// create order
const createOrder = () => {
  if (orderStore.orderItems.length === 0)
  {
    return;
  }
  OrderService.createOrder(orderStore.orderItems);
  orderStore.clearOrder();
};
// end create order

// workday
const onStartDay = () => {
  WorkdayService.startDay();
};
const onEndDay = () => {
  WorkdayService.finishDay();
};
const onPauseDay = () => {
  WorkdayService.pauseDay();
};
const onResumeDay = () => {
  WorkdayService.resumeDay();
};
// end workday
</script>

<template>
  <div v-if="isLoading">Загружаем меню...</div>
  <div v-else class="app__container">
<!--    <header>-->
<!--      <img alt="Vue logo" class="logo" src="./assets/igor.jpeg" width="125" height="125" />-->
<!--      <div>Чего желаете?</div>-->
<!--    </header>-->
    <main class="app__content">
      <div class="app__content_left">
        <OrderSummary />
      </div>
      <div class="app__content_right">
        <MenuGrid />
      </div>
    </main>
    <footer>
      <div class="app__footer_left">
        <StartDayButton @click="onStartDay" />
        <EndDayButton @click="onEndDay" />
        <PauseButton @click="onPauseDay" />
        <ResumeButton @click="onResumeDay" />
      </div>
      <CreateOrderButton @click="createOrder" />
    </footer>
  </div>
</template>

<style>
header {
  margin-bottom: 50px;
  flex: 0 0 150px;
}

main {
  display: flex;
  width: 100%;
  flex-grow: 1;
  background: #333858;
}

footer {
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  padding-right: 30px;
  background: #282C50;
}

.app__container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

.app__content {
  display: flex;
}

.app__content_left {
  flex-grow: 1;
  background: #fff;
}

.app__content_right {
  width: 600px;
  flex-shrink: 0;
}

.app__footer_left {
  display: flex;
  align-items: center;
}
</style>
