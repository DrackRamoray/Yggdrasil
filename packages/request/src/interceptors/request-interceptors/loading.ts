import type {
  AxiosRequestInterceptor,
  InternalAxiosRequestConfig,
} from '@ygg/types';
import { InterceptorKind } from '@ygg/constants';
import { loadingInstance } from '@ygg/utils';

const useLoadingRequestInterceptor = <
  T = unknown,
>(): AxiosRequestInterceptor => {
  return {
    kind: InterceptorKind.Request,
    onfulfilled(config: InternalAxiosRequestConfig<T>) {
      loadingInstance.start();

      return config;
    },
    interceptorOptions: {
      synchronous: true,
      runWhen(config: InternalAxiosRequestConfig<T>) {
        return !!config?.withLoading;
      },
    },
  };
};

export default useLoadingRequestInterceptor;
