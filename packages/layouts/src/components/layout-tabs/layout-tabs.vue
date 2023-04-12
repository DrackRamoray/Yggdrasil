<template>
  <el-scrollbar class="layout-tabs">
    <div class="layout-tabs__container">
      <el-tag
        v-for="item in store.tabs"
        :key="item.path"
        closable
        @close="close(item)"
      >
        {{ item.title }}
      </el-tag>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import type { SortableEvent } from 'sortablejs';
import Sortable from 'sortablejs';
import type { Tab } from '@ygg/types';
import { useTabStore } from '@ygg/stores';

const store = useTabStore();

const onEnd = (evt: SortableEvent) =>
  store.resortTabs({ oldIndex: evt.oldIndex!, newIndex: evt.newIndex! });

const close = (tab: Tab) => store.removeTab(tab);

onMounted(() => {
  const el = document.querySelector('.layout-tabs__container')!;
  Sortable.create(el as HTMLElement, {
    animation: 200,
    filter: '.el-tag__close',
    onEnd,
  });
});
</script>

<style lang="scss">
@import '@ygg/themes/src/variable.scss';
@import '@ygg/themes/src/theme.scss';

.layout-tabs {
  height: auto;
  margin-bottom: var(--m-md);
}
.layout-tabs__container {
  display: flex;
  flex-wrap: nowrap;
}
.layout-tabs .el-tag {
  --el-tag-bg-color: transparent;
  height: var(--h-2xl);
  padding: 0 var(--p-xs);
  cursor: pointer;

  @include themed() {
    color: t('text');
    background: t('primary-bg');
    border: none;
  }
}
.layout-tabs .el-tag:not(:last-child) {
  margin-right: var(--m-2xs);
}
.layout-tabs .el-tag__content {
  width: var(--tab-width);
  text-align: center;
}
</style>
