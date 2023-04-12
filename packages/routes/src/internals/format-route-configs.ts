import type { RouteConfigs, RouteRecordRawWithMeta } from '@ygg/types';
import { isArray, isString, pathToName, sanitizePath } from '@ygg/utils';

const getAlias = (path?: string, alias?: string | string[]): string[] => {
  const res: string[] = [];

  if (isString(alias)) {
    res.push(alias);
  } else if (isArray(alias)) {
    res.push(...alias);
  }

  if (path) {
    res.push(path);
  }

  return res;
};

const formatRouteConfigs = (
  routeConfigs: RouteConfigs,
  routePrefix: string = '.',
): RouteRecordRawWithMeta[] => {
  return Object.entries(routeConfigs)
    .map(([rawRoutePath, rawRouteConfig]) => {
      const routePath = sanitizePath(rawRoutePath, routePrefix);
      const alias = getAlias(rawRouteConfig.path, rawRouteConfig.alias);
      const name =
        rawRouteConfig.name ||
        rawRouteConfig.meta.code ||
        pathToName(routePath);

      return {
        ...rawRouteConfig,
        path: routePath,
        name,
        ...(rawRouteConfig.path ? { alias } : {}),
      } as RouteRecordRawWithMeta;
    })
    .sort((a, b) => Math.abs(a.meta.index) - Math.abs(b.meta.index));
};

export default formatRouteConfigs;
