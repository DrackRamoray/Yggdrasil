import { RouteCode } from '@ygg/constants';
import { useTranslate } from '@ygg/locales';
import type { RouteRecordRawConfig } from '@ygg/types';

const route: RouteRecordRawConfig = {
  meta: {
    index: -1,
    title: useTranslate('notFound'),
    code: RouteCode.NotFound,
  },
  props: {
    gotoHome() {
      throw new Error('Not Implement.');
    },
  },
};

export default route;
