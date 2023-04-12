import type { RouteComponent } from 'vue-router';
import type { RouteRecordRawWithMeta } from '@ygg/types';
import { getEndIndex } from '@ygg/utils';

const mergeRoutesViews = (
  routes: RouteRecordRawWithMeta[],
  views: Map<string, RouteComponent>,
): RouteRecordRawWithMeta[] => {
  const referer = new Map<string, RouteRecordRawWithMeta>();
  const routesMap = new Map<string, RouteRecordRawWithMeta>();

  routes.forEach((r) => {
    const component = r.component || views.get(r.path);
    const parentPath = r.path.slice(0, getEndIndex(r.path));
    const child = {
      ...r,
      ...(component ? { component } : {}),
    } as RouteRecordRawWithMeta;

    if (referer.has(parentPath)) {
      const parent = referer.get(parentPath)!;
      parent.children = parent.children || [];
      parent.children.push(child);
    } else {
      routesMap.set(r.path, child);
    }
  });

  return [...routesMap.values()];
};

export default mergeRoutesViews;
