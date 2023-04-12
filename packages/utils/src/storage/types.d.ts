export interface ExtendStorageOptions {
  expired?: number;
  security?: boolean;
}

export type ExtendStorage = {
  setItem<T>(key: string, value: T, options?: ExtendStorageOptions): void;
  getItem<T>(key: string, options?: ExtendStorageOptions): T | null;
  removeItem(key: string);
  key(index: number): string | null;
  clear(): void;
  length(): number;
} & Record<string, unknown>;
