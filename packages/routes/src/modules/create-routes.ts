import type { RouteRecordRawWithMeta, RoutesAndViews } from '@ygg/types';
import formatRouteConfigs from '../internals/format-route-configs';
import formatViews from '../internals/format-views';
import mergeRoutesViews from '../internals/merge-routes-views';

const createRoutes = (...params: RoutesAndViews[]) => {
  const routes: RouteRecordRawWithMeta[] = [];

  params.forEach((param) => {
    const routeConfigs = formatRouteConfigs(
      param.routeConfigs,
      param.routePrefix,
    );
    const viewConfigs = formatViews(param.viewConfigs, param.viewPrefix);

    routes.push(...mergeRoutesViews(routeConfigs, viewConfigs));
  });

  return routes;
};

export default createRoutes;
