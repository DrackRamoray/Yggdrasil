import type { RouteComponent } from 'vue-router';
import type { ViewConfigs } from '@ygg/types';
import { sanitizePath } from '@ygg/utils';

const formatViews = (
  viewConfigs: ViewConfigs,
  viewPrefix: string = '.',
): Map<string, RouteComponent> => {
  return Object.entries(viewConfigs).reduce(
    (mp, [rawViewPath, rawViewComponent]) => {
      mp.set(sanitizePath(rawViewPath, viewPrefix), rawViewComponent);

      return mp;
    },
    new Map<string, RouteComponent>(),
  );
};

export default formatViews;
