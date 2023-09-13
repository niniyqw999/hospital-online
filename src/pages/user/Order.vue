<template>
    <div>
      <div v-if="route.query.orderId">
        <orderDetail />
      </div>
      <div v-else>
        <allOrder />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from "vue-router";
  //引入子组件
  import orderDetail from "./orderDetail.vue";
  import allOrder from "./allOrder.vue";
  //获取路由对象
  let route = useRoute();
  </script>
  
  <style scoped></style>
  