<template>
  <el-header class="layout-header">
    <slot name="slogan">
      <img class="layout-header__slogan" :src="imgSrc" alt="logo" />
    </slot>
  </el-header>
</template>

<script lang="ts" setup>
const imgSrc = new URL('../../assets/slogan.png', import.meta.url).href;
</script>

<style lang="scss">
@import '@ygg/themes/src/variable.scss';
@import '@ygg/themes/src/theme.scss';

.layout-header {
  padding: var(--p-2xs) var(--p-sm);
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);

  @include themed() {
    background: t('primary-bg');
  }
}
.layout-header__slogan {
  height: 100%;
  object-fit: contain;
}
</style>
