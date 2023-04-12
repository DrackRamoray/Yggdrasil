import { stringify as JsonStringify, parse as JsonParse } from 'devalue';
import type { ExtendStorage, ExtendStorageOptions } from './types';
import { decodeBase64, decrypt, encodeBase64, encrypt } from '../crypto';

const Millisecond = 1000;
const defaultOptions: ExtendStorageOptions = {};

const genKey = (key: string) => `${YGG_STORAGE_NAMESPACE}.${key}`;

const setItem =
  <T = unknown>(storage: Storage) =>
  (key: string, value: T, options: ExtendStorageOptions = defaultOptions) => {
    const obj = {
      timestamp: Date.now(),
      data: options.security
        ? encrypt(JsonStringify(value))
        : JsonStringify(value),
      expired: options.expired,
      security: options.security,
    };

    Reflect.apply(storage.setItem, storage, [
      genKey(key),
      encodeBase64(JsonStringify(obj)),
    ]);
  };

const getItem =
  <T>(storage: Storage) =>
  (key: string, options: ExtendStorageOptions = defaultOptions): T | null => {
    const str = Reflect.apply(storage.getItem, storage, [genKey(key)]);

    if (str === null) {
      return str;
    }

    const raw = JsonParse(decodeBase64(str));
    const isExpired =
      raw.expired && raw.timestamp + raw.expired * Millisecond < Date.now();
    const shouldExpire =
      options.expired &&
      raw.timestamp + options.expired * Millisecond < Date.now();

    if (isExpired || shouldExpire) {
      return null;
    }

    return options.security || raw.security
      ? JsonParse(decrypt(raw.data))
      : JsonParse(raw.data);
  };

const removeItem = (storage: Storage) => (key: string) => {
  Reflect.apply(storage.removeItem, storage, [genKey(key)]);
};

const keyIndex = (storage: Storage) => (index: number) => {
  return Reflect.apply(storage.key, storage, [index]);
};

const clear = (storage: Storage) => () => {
  Reflect.apply(storage.clear, storage, []);
};

const length = (storage: Storage) => storage.length;

enum ReservedKey {
  SetItem = 'setItem',
  GetItem = 'getItem',
  RemoveItem = 'removeItem',
  Key = 'key',
  Clear = 'clear',
  Length = 'len',
}
const ReservedKeys = Object.values(ReservedKey);

export const createStorage = (storage: Storage): ExtendStorage => {
  return new Proxy(storage, {
    set(s: Storage, key: string, value: unknown) {
      if (ReservedKeys.includes(key as ReservedKey)) {
        return false;
      }

      setItem(s)(key, value);
      return true;
    },
    get(s: Storage, key: string) {
      switch (key) {
        case ReservedKey.SetItem:
          return setItem(s);
        case ReservedKey.GetItem:
          return getItem(s);
        case ReservedKey.RemoveItem:
          return removeItem(s);
        case ReservedKey.Key:
          return keyIndex(s);
        case ReservedKey.Clear:
          return clear(s);
        case ReservedKey.Length:
          return length(s);
        default:
          return getItem(s)(key);
      }
    },
  }) as unknown as ExtendStorage;
};

export const overwriteStorage = (
  proxyStorage: ExtendStorage,
  key: 'localStorage' | 'sessionStorage',
) => {
  Object.defineProperty(window, key, {
    configurable: true,
    enumerable: true,
    value: proxyStorage,
  });
};
