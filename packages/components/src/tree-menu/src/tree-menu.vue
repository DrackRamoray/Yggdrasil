<template>
  <el-menu class="tree-menu">
    <tree-menu-item
      v-for="item in props.menus"
      :item="item"
      :level="props.level"
      :key="item.path"
    ></tree-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import type { Menu } from '@ygg/types';
import TreeMenuItem from './tree-menu-item.vue';

interface Props {
  level: number;
  menus: Menu;
}

const props = defineProps<Props>();
</script>

<style lang="scss">
.tree-menu {
  border-right: none;
}
</style>
