<template>
  <div class="pages-errors__bad-gateway">
    <img :src="imgSrc" alt="BadGateway" />
  </div>
</template>

<script lang="ts" setup>
const imgSrc = new URL('../../assets/bad-gateway.png', import.meta.url).href;
</script>

<style lang="scss">
.pages-errors__bad-gateway {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pages-errors__bad-gateway img {
  width: 615px;
  height: auto;
}
</style>
