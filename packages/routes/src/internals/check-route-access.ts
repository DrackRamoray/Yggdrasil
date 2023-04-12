import type { RouteCode } from '@ygg/constants';
import type { RouteRecordRawWithMeta } from '@ygg/types';
import { isArray } from '@ygg/utils';

const checkRouteAccess = (
  routes: RouteRecordRawWithMeta[],
  routesMap: Set<RouteCode>,
  isLoggedIn: boolean,
) => {
  const res: RouteRecordRawWithMeta[] = [];

  routes.forEach((r) => {
    let b = r.meta.requiredAuth ? isLoggedIn : true;
    b = b && (r.meta.requiredPermission ? routesMap.has(r.meta.code) : true);

    if (!b) {
      return;
    }

    const children =
      isArray(r.children) && r.children.length
        ? checkRouteAccess(
            r.children as RouteRecordRawWithMeta[],
            routesMap,
            isLoggedIn,
          )
        : undefined;

    res.push({
      ...r,
      ...(children && children.length ? { children } : {}),
    } as RouteRecordRawWithMeta);
  });

  return res;
};

export default checkRouteAccess;
