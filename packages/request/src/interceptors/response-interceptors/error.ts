import type {
  AxiosError,
  AxiosResponse,
  AxiosResponseInterceptor,
  ResponseResult,
} from '@ygg/types';
import {
  InterceptorKind,
  UnknownErrorCode,
  UnknownStatus,
} from '@ygg/constants';
import HttpError from '../../errors/http-error';

const useErrorResponseInterceptor = <
  T = unknown,
  E = unknown,
  D = unknown,
>(): AxiosResponseInterceptor => {
  return {
    kind: InterceptorKind.Response,
    onfulfilled(res: AxiosResponse<ResponseResult<T, E>, D>) {
      if (res.data && res.data.success) {
        return Promise.resolve(res);
      }

      const { status, data, config } = res;

      return Promise.reject(
        new HttpError(
          status,
          data.result.code.toString(),
          data.result.message,
          config.method,
          config.url,
          data.result,
        ),
      );
    },
    onRejected(error: any) {
      if (error instanceof HttpError) {
        return Promise.reject(error);
      }

      const response = (error as AxiosError)?.response;
      const result = (response?.data as any)?.result;
      const config = response?.config;

      return Promise.reject(
        new HttpError(
          (error as AxiosError).status ?? response?.status ?? UnknownStatus,
          result?.code || UnknownErrorCode,
          result?.message || (error as Error).message,
          config?.method,
          config?.url,
          error,
        ),
      );
    },
  };
};

export default useErrorResponseInterceptor;
