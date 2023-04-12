import { defineStore } from 'pinia';
import { shallowReactive } from 'vue';
import type { Menu } from '@ygg/types';
import { isArray, local } from '@ygg/utils';
import { MenuStorageKey } from '@ygg/constants';

const useMenuStore = defineStore('route', () => {
  const menus = shallowReactive<Menu>([]);
  const menuSet = new Set<string>();

  const saveRoutes = (menuArr: Menu) => {
    menus.splice(0, menus.length, ...menuArr);
    menuArr.forEach((r) => {
      menuSet.add(r.path);
    });
    local.setItem<Menu>(MenuStorageKey, menus);
  };

  const loadRoutes = () => {
    const menuArr = local.getItem<Menu>(MenuStorageKey);

    if (isArray(menuArr)) {
      saveRoutes(menuArr);
    }
  };

  return {
    menus,
    saveRoutes,
    loadRoutes,
  };
});

export default useMenuStore;
