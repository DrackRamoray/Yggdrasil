<template>
  <div class="pages-errors">
    <img :src="imgSrc" alt="Forbidden" />
    <div class="pages-errors__body">
      <label class="pages-errors__label">Invalid page.</label>
      <el-link class="pages-errors__label" @click="props.gotoLogin">
        Please login again.
      </el-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  gotoLogin: () => void;
}

const props = defineProps<Props>();

const imgSrc = new URL('../../assets/forbidden.png', import.meta.url).href;
</script>

<style lang="scss">
@use '../../styles/errors';
</style>
