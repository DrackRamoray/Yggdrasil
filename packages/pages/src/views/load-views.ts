import type { RouteConfigs, ViewConfigs } from '@ygg/types';

const loadViews = () => {
  const routeConfigs: RouteConfigs = import.meta.glob('./**/*-route.ts', {
    eager: true,
    import: 'default',
  });

  const views: ViewConfigs = import.meta.glob('./**/*.vue', {
    eager: true,
    import: 'default',
  });

  return { routeConfigs, views };
};

export default loadViews();
