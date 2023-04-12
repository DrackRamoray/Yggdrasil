import type {
  AxiosResponse,
  AxiosResponseInterceptor,
  InternalAxiosRequestConfig,
} from '@ygg/types';
import { InterceptorKind } from '@ygg/constants';
import { loadingInstance } from '@ygg/utils';

const useLoadingResponseInterceptor = <
  T = unknown,
  D = unknown,
>(): AxiosResponseInterceptor => {
  return {
    kind: InterceptorKind.Response,
    onfulfilled(res: AxiosResponse<T, D>) {
      loadingInstance.end();
      return res;
    },
    onRejected(error: unknown) {
      loadingInstance.end();
      return Promise.reject(error);
    },
    interceptorOptions: {
      runWhen(config: InternalAxiosRequestConfig<D>) {
        return !!config?.withLoading;
      },
    },
  };
};

export default useLoadingResponseInterceptor;
