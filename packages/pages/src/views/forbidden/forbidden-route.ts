import { RouteCode } from '@ygg/constants';
import { useTranslate } from '@ygg/locales';
import type { RouteRecordRawConfig } from '@ygg/types';

const route: RouteRecordRawConfig = {
  meta: {
    index: -1,
    title: useTranslate('forbidden'),
    code: RouteCode.Forbidden,
  },
  props: {
    gotoLogin() {
      throw new Error('Not Implement.');
    },
  },
};

export default route;
