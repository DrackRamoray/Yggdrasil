import {
  AxiosInterceptorOptions,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { InterceptorKind } from '@ygg/constants';

declare module 'axios' {
  interface AxiosRequestConfig {
    requiredPermission?: boolean;
    withLoading?: boolean;
    reportError?: boolean;
    omitRedundant?: boolean;
    transformResult?: <T, R>(data: T) => R;
  }
}

export type * from 'axios';

export type OnFulfilled<T extends InternalAxiosRequestConfig | AxiosResponse> =
  | ((value: T) => T | Promise<T>)
  | null;

export type OnRejected<E = unknown> = ((error: E) => E) | null;

export type AxiosRequestInterceptor = {
  kind: InterceptorKind.Request;
  onfulfilled?: OnFulfilled<InternalAxiosRequestConfig>;
  onRejected?: OnRejected;
  interceptorOptions?: AxiosInterceptorOptions;
};

export type AxiosResponseInterceptor = {
  kind: InterceptorKind.Response;
  onfulfilled?: OnFulfilled<AxiosResponse>;
  onRejected?: OnRejected;
  interceptorOptions?: AxiosInterceptorOptions;
};

export type AxiosInterceptor =
  | AxiosRequestInterceptor
  | AxiosResponseInterceptor;

export type ResponseSuccess<T = unknown> = {
  timestamp: number;
  success: true;
  result: T;
};

export type ResponseError<E = unknown> = {
  timestamp: number;
  success: false;
  result: {
    code: string | number;
    message?: string;
    details: E;
  };
};

export type ResponseResult<T, E> = ResponseSuccess<T> | ResponseError<E>;
