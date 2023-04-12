export const setHtmlLanguage = (lang: string) => {
  document.querySelector('html')!.setAttribute('lang', lang);
};
