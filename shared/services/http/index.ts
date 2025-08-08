import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig,} from "axios";

// eslint-disable-next-line
type AnyType = any;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryNumber?: number;
}

export interface CustomAxiosError<T = AnyType, D = AnyType> extends AxiosError<T, D> {
  config?: CustomAxiosRequestConfig;
  ok: false;
}

export interface CustomAxiosResponse<T = AnyType, D = AnyType> extends AxiosResponse<T, D> {
  ok: true;
}

interface CustomAxiosInstance extends AxiosInstance {
  get<T = AnyType, R = CustomAxiosResponse<T>, D = AnyType>(
    url: string,
    config?: AxiosRequestConfig<D>,
    retryAttempts?: number
  ): Promise<R>;
}

const http = axios.create({
  baseURL: "http://localhost:5005/api",
}) as CustomAxiosInstance;
http.defaults.headers.common["Authorization"] = "Bearer TESTI";

function enrichResponse<T, D>(response: CustomAxiosResponse<T, D>) {
  const status = response.status;
  const ok = (status >= 200 && status < 300);
  if (status && (status >= 200 && status < 300)) {
    response.ok = true;
  }
  return {
    ...response,
    ok,
  };
}

const originalGet = http.get;
async function get<T = AnyType, R = CustomAxiosResponse<T>, D = AnyType>(
  url: string,
  config?: AxiosRequestConfig<D>,
  retryAttempts?: number,
): Promise<R> {
  try {
    return await originalGet<T, R>(url, config).then(r => enrichResponse(r as CustomAxiosResponse<T>) as R);
  } catch(err) {
    const error = err as CustomAxiosError<T>;
    if (retryAttempts && error.config) {
      if (!error.config.retryNumber) {
        error.config.retryNumber = 1;
      }
      if (error && error.config.retryNumber <= retryAttempts) {
        try {
          return await get<T, R>(url, error.config);
        } catch {
          error.config.retryNumber += 1;
        }
      }
    }
    const enrichedError = {
      ...error.toJSON?.() ?? {},
      ok: false,
      status: error.status,
      message: error.message,
    };
    return Promise.reject(enrichedError);
  }
}

http.get = get;

// Create a utility type to extract the inner type of data
type ExtractData<T> = T extends { data: infer U } ? U : never;

// Define the HttpResponse type that extends AxiosResponse
type HttpResponse<T> = AxiosResponse<ExtractData<T>>;

type CustomAxiosResult<TData = unknown, TErrorData = unknown> =
  | (CustomAxiosResponse<TData> & { ok: true })
  | (CustomAxiosError<TErrorData> & {
    ok: false,
    data?: TData,
    statusText?: string,
  })

export type {
  HttpResponse,
  CustomAxiosResult,
};

export default http;

{/** 
 With the above axios config I tried to address 3 concerns:
 1- Being able to have multiple axios instances
    Solution: it is possible by passing baseUrl in config from .get({ baseUrl: '' })
 2- Being able to retry failed requests:
    Solution: You can see the retry implementation above. Although if you use a library
    like react-query (in client side) this would be a breeze and no need for this config.
 3- Being able to handle request and response middleware behaviour in a centralized location,
    because axios interceptors are for EVERY request and not just a particular request.
    Solution: You can see the implementation above. Although you can still use interceptors.
    The trick of how we created our customized get request is very simple. we simply created
    a WRAPPER for the get method of the axios, by assigning a new definition of get that implements
    get of axios internally !!
    
    ** NOTE ** Implementation of 401 error handling is straight forward here. You need to consider these:
    1- in case of 401 error, a refreshToken request should be sent to get a new accessToken.
    2- the failed request config should be held somewhere to retry after new accessToken.
    3- other requests that come that encounter 401, should not trigger refreshToken API if it is
       already sent, and you are waiting for the response. However, they should be kept in a list to
       be retried later after a new accessToken.  
  
***/}

