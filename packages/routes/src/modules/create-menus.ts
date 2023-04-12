import { isArray } from '@ygg/utils';
import type { Menu, MenuItem, RouteRecordRawWithMeta } from '@ygg/types';

const createMenus = (routes: RouteRecordRawWithMeta[]): Menu => {
  const menus: Menu = [];

  routes.forEach((r) => {
    if (r.meta.index < 0) {
      return;
    }

    const menu: MenuItem = {
      path: r.path,
      index: r.meta.index,
      title: r.meta.title,
      code: r.meta.code,
      icon: r.meta.icon,
      children: [],
    };

    if (isArray(r.children) && r.children.length > 0) {
      menu.children = createMenus(r.children as RouteRecordRawWithMeta[]);
      menus.push(menu);
    } else {
      menus.push(menu);
    }
  });

  return menus;
};

export default createMenus;
