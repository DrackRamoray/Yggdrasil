import type {
  AxiosRequestConfig,
  DownloadFileData,
  UploadFileData,
} from '@ygg/types';
import client from './client';

export const del = <T, P extends Record<string, unknown>>(
  url: string,
  data: P,
  config?: AxiosRequestConfig,
) => {
  return client.delete<T, P>(url, data, config);
};

export const download = (
  url: string,
  data: DownloadFileData,
  config?: AxiosRequestConfig,
) => {
  return client.download(url, data, {
    requiredPermission: false,
    ...config,
  });
};

export const get = <T, P extends Record<string, unknown>>(
  url: string,
  params: P,
  config?: AxiosRequestConfig,
) => {
  return client.get<T, P>(url, params, config);
};

export const patch = <T, P extends Record<string, unknown>>(
  url: string,
  data: P,
  config?: AxiosRequestConfig,
) => {
  return client.patch<T, P>(url, data, config);
};

export const post = <T, P extends Record<string, unknown>>(
  url: string,
  data: P,
  config?: AxiosRequestConfig,
) => {
  return client.post<T, P>(url, data, config);
};

export const put = <T, P extends Record<string, unknown>>(
  url: string,
  data: P,
  config?: AxiosRequestConfig,
) => {
  return client.put<T, P>(url, data, config);
};

export const upload = <T = unknown>(
  url: string,
  data: UploadFileData,
  config?: AxiosRequestConfig,
) => {
  return client.upload<T>(url, data, {
    requiredPermission: false,
    ...config,
  });
};
