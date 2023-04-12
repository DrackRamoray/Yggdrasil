import { shallowReactive } from 'vue';
import { defineStore } from 'pinia';
import type { Tab } from '@ygg/types';
import { isArray, local } from '@ygg/utils';
import { TabStorageKey } from '@ygg/constants';

const useTabStore = defineStore('tab', () => {
  const tabs = shallowReactive<Tab[]>([]);
  const tabSet = new Set();

  const saveTab = (tab: Tab) => {
    if (tabSet.has(tab.path)) {
      return;
    }

    tabSet.add(tab.path);
    tabs.push(tab);
    local.setItem<Tab[]>(TabStorageKey, tabs);
  };

  const removeTab = (tab: Tab) => {
    const index = tabs.findIndex((t) => t.path === tab.path);

    if (index === -1) {
      return;
    }

    tabSet.delete(tab.path);
    tabs.splice(index, 1);
    local.setItem<Tab[]>(TabStorageKey, tabs);
  };

  const resortTabs = (params: { oldIndex: number; newIndex: number }) => {
    const oldIndex = params.oldIndex - 1;
    const newIndex = params.newIndex - 1;
    tabs.splice(newIndex, 0, tabs.splice(oldIndex, 1)[0]);
    local.setItem<Tab[]>(TabStorageKey, tabs);
  };

  const loadTabs = () => {
    const tabArr = local.getItem<Tab[]>(TabStorageKey);

    if (isArray(tabArr)) {
      tabs.splice(0, tabs.length, ...tabArr);
      tabArr.forEach((tab) => tabSet.add(tab.path));
    }
  };

  return {
    tabs,
    saveTab,
    removeTab,
    resortTabs,
    loadTabs,
  };
});

export default useTabStore;
