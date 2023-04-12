import type {
  AxiosInstance,
  AxiosInterceptor,
  AxiosRequestConfig,
  CreateAxiosDefaults,
  DownloadFileData,
  Method,
  ResponseSuccess,
  UploadFileData,
} from '@ygg/types';
import axios from 'axios';
import { ContentType, InterceptorKind } from '@ygg/constants';
import {
  download,
  downloadBlob,
  getUploadFormData,
  getUrl,
  getUrlAndParams,
} from '@ygg/utils';

class AxiosClient {
  private instance: AxiosInstance;

  constructor(options: CreateAxiosDefaults) {
    this.instance = axios.create(options);
  }

  public register(interceptor: AxiosInterceptor) {
    if (interceptor.kind === InterceptorKind.Request) {
      this.instance.interceptors.request.use(
        interceptor.onfulfilled,
        interceptor.onRejected,
        interceptor.interceptorOptions,
      );
    }

    if (interceptor.kind === InterceptorKind.Response) {
      this.instance.interceptors.response.use(
        interceptor.onfulfilled,
        interceptor.onRejected,
        interceptor.interceptorOptions,
      );
    }
  }

  public registerAll(interceptors: AxiosInterceptor[]) {
    interceptors.forEach((interceptor) => this.register(interceptor));
  }

  public request<T = unknown, C = unknown>(
    method: Method,
    url: string,
    axiosRequestConfig?: AxiosRequestConfig<C>,
  ): Promise<T> {
    const config = {
      ...axiosRequestConfig,
      method,
      url,
    };

    return this.instance
      .request<ResponseSuccess<T>>(config)
      .then((res) => res.data.result);
  }

  public delete<T, D extends Record<string, unknown>>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ) {
    return this.request<T>('DELETE', getUrl(url, data), config);
  }

  public download(
    url: string,
    data: DownloadFileData,
    config?: AxiosRequestConfig,
  ): Promise<void> {
    const { canDownloadDirectly, downloadDirectly } = download(url, data);

    if (canDownloadDirectly()) {
      return Promise.resolve().then(() => downloadDirectly());
    }

    const method = config && config.method ? (config.method as Method) : 'GET';

    return this.request<Blob>(method, url, {
      ...config,
      responseType: 'blob',
    }).then((blob) => downloadBlob(data, blob));
  }

  public get<T, P extends Record<string, unknown>>(
    url: string,
    params: P,
    config?: AxiosRequestConfig,
  ) {
    const { url: sanitizedUrl, params: sanitizedParams } = getUrlAndParams<P>(
      url,
      params,
      !!config?.omitRedundant,
    );

    return this.request<T>('GET', sanitizedUrl, {
      ...config,
      params: sanitizedParams,
    });
  }

  public patch<T, D extends Record<string, unknown>>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ) {
    const { url: sanitizedUrl, params: sanitizedData } = getUrlAndParams<D>(
      url,
      data,
      !!config?.omitRedundant,
    );

    return this.request<T>('PATCH', sanitizedUrl, {
      ...config,
      data: sanitizedData,
    });
  }

  public post<T, D extends Record<string, unknown>>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ) {
    const { url: sanitizedUrl, params: sanitizedData } = getUrlAndParams<D>(
      url,
      data,
      !!config?.omitRedundant,
    );

    return this.request<T>('POST', sanitizedUrl, {
      ...config,
      data: sanitizedData,
    });
  }

  public put<T, D extends Record<string, unknown>>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ) {
    const { url: sanitizedUrl, params: sanitizedData } = getUrlAndParams<D>(
      url,
      data,
      !!config?.omitRedundant,
    );

    return this.request<T>('PUT', sanitizedUrl, {
      ...config,
      data: sanitizedData,
    });
  }

  public upload<T = unknown>(
    url: string,
    data: UploadFileData,
    config?: AxiosRequestConfig,
  ) {
    const formData = getUploadFormData(data);
    const method = config && config.method ? (config.method as Method) : 'PUT';

    return this.request<T>(method, url, {
      ...config,
      data: formData,
      headers: {
        'Content-Type': ContentType.FormData,
        ...config?.headers,
      },
    });
  }
}

export default AxiosClient;
