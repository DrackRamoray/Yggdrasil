<template>
  <el-aside class="layout-aside">
    <el-scrollbar>
      <tree-menu :level="3" :menus="menus"></tree-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { TreeMenu } from '@ygg/components';
import { useMenuStore } from '@ygg/stores';

const menuStore = useMenuStore();

const menus = computed(() => menuStore.menus);
</script>

<style lang="scss">
@import '@ygg/themes/src/variable.scss';
@import '@ygg/themes/src/theme.scss';

.layout-aside {
  width: var(--layout-aside);
  height: 100%;
  padding-top: var(--p-md);
  border-right: 1px solid #eee;

  @include themed() {
    background: t('primary-bg');
  }
}
</style>
