import { setHtmlLanguage } from '@ygg/utils';
import type { SupportedLocales } from '../internals/constants';
import useI18n from './use-i18n';

const useLocale = (locale?: SupportedLocales) => {
  const i18n = useI18n();
  const target = locale || i18n.global.locale.value;

  i18n.global.locale.value = target;

  setHtmlLanguage(target);
};

export default useLocale;
