import type { RouteConfigs, RoutesAndViews, ViewConfigs } from '@ygg/types';

const loadViews = (): RoutesAndViews => {
  const routeConfigs: RouteConfigs = import.meta.glob('./**/*-route.ts', {
    eager: true,
    import: 'default',
  });
  const viewConfigs: ViewConfigs = import.meta.glob('./**/*.vue'); // async-component

  return { routeConfigs, viewConfigs };
};

export default loadViews();
