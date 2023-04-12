import type { RouteIndexAndCode, RouteRecordRawWithMeta } from '@ygg/types';
import checkRouteAccess from '../internals/check-route-access';

const filterRoutes = (
  routes: RouteRecordRawWithMeta[],
  routeIndexAndCodes: RouteIndexAndCode[],
  isLoggedIn: boolean,
): RouteRecordRawWithMeta[] => {
  const codeSet = new Set(routeIndexAndCodes.map((r) => r.code));

  return checkRouteAccess(routes, codeSet, isLoggedIn);
};

export default filterRoutes;
