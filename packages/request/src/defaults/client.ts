import type { CreateAxiosDefaults } from '@ygg/types';
import { Accept, ContentType } from '@ygg/constants';
import AxiosClient from '../clients/axios-client';
import {
  useErrorResponseInterceptor,
  useLoadingRequestInterceptor,
  useLoadingResponseInterceptor,
  usePermissionRequestInterceptor,
} from '../interceptors';

const DefaultConfig: CreateAxiosDefaults = {
  timeout: 30 * 1000,
  headers: {
    'Content-Type': ContentType.JSON,
    accept: Accept.JSON1,
  },
  requiredPermission: true,
  withLoading: true,
  reportError: true,
  omitRedundant: true,
};

const Interceptors = [
  useLoadingRequestInterceptor(),
  useLoadingResponseInterceptor(),
  usePermissionRequestInterceptor(),
  useErrorResponseInterceptor(),
];

const client = new AxiosClient(DefaultConfig);

client.registerAll(Interceptors);

export default client;
