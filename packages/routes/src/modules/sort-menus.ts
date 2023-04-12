import type { RouteCode } from '@ygg/constants';
import type { Menu, RouteIndexAndCode } from '@ygg/types';
import { isArray } from '@ygg/utils';

const doSort = (menus: Menu, codeMap: Map<RouteCode, RouteIndexAndCode>) => {
  menus.sort((mx, my) => {
    const a = codeMap.get(mx.code)?.index ?? mx.index;
    const b = codeMap.get(my.code)?.index ?? my.index;

    return Math.abs(a) - Math.abs(b);
  });

  menus.forEach((r) => {
    if (isArray(r.children) && r.children.length > 0) {
      doSort(r.children, codeMap);
    }
  });
};

const sortMenus = (menus: Menu, routeIndexAndCodes: RouteIndexAndCode[]) => {
  const codeMap = routeIndexAndCodes.reduce((mp, rc) => {
    mp.set(rc.code, rc);

    return mp;
  }, new Map<RouteCode, RouteIndexAndCode>());

  doSort(menus, codeMap);
};

export default sortMenus;
