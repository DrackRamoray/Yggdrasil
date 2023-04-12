const is = (data: unknown, typ: string): boolean =>
  Object.prototype.toString.call(data) === `[object ${typ.toLowerCase()}]`;

export const isString = (data: unknown): data is string => is(data, 'string');

export const isArray = (data: unknown): data is Array<unknown> =>
  Array.isArray(data);
