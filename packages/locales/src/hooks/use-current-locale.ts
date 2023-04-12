import useI18n from './use-i18n';

const useCurrentLocale = () => {
  const i18n = useI18n();
  return i18n.global.locale.value;
};

export default useCurrentLocale;
