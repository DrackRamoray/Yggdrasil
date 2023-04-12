import { createI18n } from 'vue-i18n';
import { MessageTypes, SupportedLocales } from './constants';
import type { Message } from '../languages';
import getMessages from './get-messages';

const i18n = createI18n({
  legacy: false,
  locale: SupportedLocales.En,
  fallbackLocale: SupportedLocales.En,
  globalInjection: true,
  messages: getMessages<Message>(MessageTypes.Message),
});

export default i18n;
