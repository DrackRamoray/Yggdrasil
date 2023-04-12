import { RouteCode } from '@ygg/constants';
import { useTranslate } from '@ygg/locales';
import type { RouteRecordRawConfig } from '@ygg/types';

const route: RouteRecordRawConfig = {
  meta: {
    index: -1,
    title: useTranslate('badGateway'),
    code: RouteCode.BadGateway,
  },
};

export default route;
