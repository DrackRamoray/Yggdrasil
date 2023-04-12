import { local } from '@ygg/utils';
import {
  InterceptorKind,
  RoleAuthKey,
  RoleStorageKey,
  TokenAuthKey,
  TokenStorageKey,
  UserAuthKey,
  UserStorageKey,
} from '@ygg/constants';
import type {
  AxiosRequestInterceptor,
  InternalAxiosRequestConfig,
} from '@ygg/types';

const usePermissionRequestInterceptor = <
  T = unknown,
>(): AxiosRequestInterceptor => {
  return {
    kind: InterceptorKind.Request,
    onfulfilled(config: InternalAxiosRequestConfig<T>) {
      const token = local.getItem(TokenStorageKey);
      const userId = local.getItem(UserStorageKey);
      const roleId = local.getItem(RoleStorageKey);

      Object.assign(config.headers, {
        [TokenAuthKey]: token,
        [UserAuthKey]: userId,
        [RoleAuthKey]: roleId,
      });

      return config;
    },
    interceptorOptions: {
      synchronous: true,
      runWhen(config: InternalAxiosRequestConfig<T>) {
        return !!config?.requiredPermission;
      },
    },
  };
};

export default usePermissionRequestInterceptor;
