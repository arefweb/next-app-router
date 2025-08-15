import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// eslint-disable-next-line
export type AnyType = any;

export interface CustomAxiosRequestConfig<D = AnyType> extends AxiosRequestConfig<D> {
  noAuth?: boolean;
}

export interface CustomAxiosErrorConfig extends InternalAxiosRequestConfig {
  retryNumber?: number;
  noAuth?: boolean;
}

export interface CustomAxiosError<T = AnyType, D = AnyType> extends AxiosError<T, D> {
  config?: CustomAxiosErrorConfig;
  ok: false;
}

export interface CustomAxiosResponse<T = AnyType, D = AnyType> extends AxiosResponse<T, D> {
  ok: true;
}

export interface CustomAxiosInstance extends AxiosInstance {
  get<T = AnyType, R = CustomAxiosResponse<T>, D = AnyType>(
    url: string,
    config?: CustomAxiosRequestConfig<D>,
    retryAttempts?: number,
  ): Promise<R>;
  post<T = AnyType, R = CustomAxiosResponse<T>, D = AnyType>(
    url: string,
    data?: D,
    config?: CustomAxiosRequestConfig<D>,
    retryAttempts?: number,
  ): Promise<R>;
  put<T = AnyType, R = CustomAxiosResponse<T>, D = AnyType>(
    url: string,
    data?: D,
    config?: CustomAxiosRequestConfig<D>,
    retryAttempts?: number,
  ): Promise<R>;
  delete<T = AnyType, R = CustomAxiosResponse<T>, D = AnyType>(
    url: string,
    config?: CustomAxiosRequestConfig<D>,
    retryAttempts?: number,
  ): Promise<R>;
}


// Create a utility type to extract the inner type of data
type ExtractData<T> = T extends { data: infer U } ? U : never;

// Define the HttpResponse type that extends AxiosResponse
export type HttpResponse<T> = AxiosResponse<ExtractData<T>>;

export type CustomAxiosResult<TData = unknown, TErrorData = unknown> =
  | (CustomAxiosResponse<TData> & { ok: true })
  | (CustomAxiosError<TErrorData> & {
  ok: false,
  data?: TData,
  statusText?: string,
})