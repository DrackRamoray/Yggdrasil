<template>
  <div class="pages-errors">
    <img :src="imgSrc" alt="NotFound" />
    <div class="pages-errors__body">
      <label class="pages-errors__label">Invalid page.</label>
      <el-link class="pages-errors__label" @click="props.gotoHome">
        Please login again.
      </el-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  gotoHome: () => void;
}

const props = defineProps<Props>();

const imgSrc = new URL('../../assets/not-found.png', import.meta.url).href;
</script>

<style lang="scss">
@use '../../styles/errors';
</style>
