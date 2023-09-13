<script setup lang="ts">

</script>

<template>
<div class="container">
<Top></Top>
<div class="content">
<RouterView></RouterView>
</div>
<Bottom></Bottom>
<Login></Login>
</div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>
