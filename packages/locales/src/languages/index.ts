import type { MessageTypes } from '../internals/constants';
import { SupportedLocales } from '../internals/constants';
import { default as en } from './en/en';
import { default as zhCN } from './zh-cn/zh-cn';

export type ElementPlusMessage = Readonly<
  typeof en | typeof zhCN
>[MessageTypes.ElementPlusMessage];
export type Message = Readonly<typeof en & typeof zhCN>[MessageTypes.Message];

export interface Messages {
  [MessageTypes.ElementPlusMessage]: ElementPlusMessage;
  [MessageTypes.Message]: Message;
}

const messages: Record<SupportedLocales, Messages> = {
  [SupportedLocales.En]: en,
  [SupportedLocales.Zh]: zhCN,
} as const;

export default messages;
