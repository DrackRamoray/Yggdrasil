import { MessageTypes, SupportedLocales } from './constants';
import messages from '../languages';

const getMessages = <T>(messageType: MessageTypes) =>
  Object.values(SupportedLocales).reduce(
    (acc, language) => ({
      ...acc,
      [language]: messages[language][messageType],
    }),
    {} as Record<SupportedLocales, T>,
  );

export default getMessages;
