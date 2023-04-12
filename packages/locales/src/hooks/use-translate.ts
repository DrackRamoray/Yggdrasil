import useI18n from './use-i18n';

const useTranslate = (path: string) => {
  const i18n = useI18n();

  return i18n.global.t(path);
};

export default useTranslate;
