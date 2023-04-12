export enum SupportedLocales {
  Zh = 'zh-cn',
  En = 'en',
}

export enum MessageTypes {
  ElementPlusMessage = 'elementPlusMessages',
  Message = 'messages',
}

export const SupportedLocaleOptions = [
  {
    label: 'English',
    value: SupportedLocales.En,
  },
  {
    label: '简体中文',
    value: SupportedLocales.Zh,
  },
];
