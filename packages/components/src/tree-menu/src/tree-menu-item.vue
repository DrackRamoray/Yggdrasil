<template>
  <el-sub-menu
    v-if="hasChildren"
    :key="props.item.index"
    :index="props.item.path"
  >
    <template #title>{{ props.item.title }}</template>
    <template v-if="props.level > 0">
      <tree-menu-item
        v-for="child in props.item.children"
        :item="child"
        :level="props.level - 1"
        :key="child.path"
      ></tree-menu-item>
    </template>
  </el-sub-menu>
  <el-menu-item v-else :key="props.item.index" :index="props.item.path">
    {{ props.item.title }}
  </el-menu-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { MenuItem } from '@ygg/types';
import { isArray } from '@ygg/utils';

interface Props {
  level: number;
  item: MenuItem;
}

const props = defineProps<Props>();
const hasChildren = computed(
  () => isArray(props.item.children) && props.item.children.length,
);
</script>

<style lang=""></style>
