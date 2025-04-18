import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomAxiosInstance extends AxiosInstance {
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
    retryAttempts?: number
  ): Promise<R>;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryNumber?: number;
}

interface CustomAxiosError<T = any, D = any> extends AxiosError<T, D> {
  config?: CustomAxiosRequestConfig;
}

const http = axios.create({
  baseURL: "http://localhost:5005/api",
}) as CustomAxiosInstance;
http.defaults.headers.common["Authorization"] = "Bearer TESTI";

const originalGet = http.get;
async function get<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
  retryAttempts?: number,
): Promise<R> {
  try {
    const result = await originalGet<T, R>(url, config).then((resp) => {
      return resp;
    });
    return result;
  } catch(err) {
    const error = err as CustomAxiosError<T>;
    if (retryAttempts && error.config) {
      if (!error.config.retryNumber) {
        error.config.retryNumber = 1;
      }
      while (error && error.config.retryNumber <= retryAttempts) {
        console.log("in WHILE Loop << ", error.config.retryNumber);
        try {
          const result = await originalGet<T, R>(url, error.config).then((r) => r);
          return result;
        } catch(_) {
          error.config.retryNumber += 1;
          continue;
        }
      }
    }
    return Promise.reject(error);
  }
};

http.get = get;

export default http;

{/** 
 With the above axios config I tried to address 3 concerns:
 1- Being able to have multiple axios instances
    Solution: it is possible by passing baseUrl in config from .get({ baseUrl: '' })
 2- Being able to retry failed requests:
    Solution: You can see the retry implementation above. Although if you use a library
    like react-query this would be a breeze and no need for this config.
 3- Being able to handle request and response middleware behaviour in a centralized location,
    because axios interceptors are for EVERY request and not just a particular request.
    Solution: You can see the implementation above. Although you can still use interceptors.
    The trick of how we created our customized get request is very simple. we simply created
    a WRAPPER for the get method of the axios, by assigning a new difinition of get that implements
    get of axios internally !!
    
    ** NOTE ** Implementation of 401 error handling is straight forward here. You need to consider these:
    1- in case of 401 error, a refreshToken request should be sent to get a new accessToken.
    2- the failed request config should be held somewhere to retry after new accessToken.
    3- other requests that come that encounter 401, should not trigger refreshToken API if it is
       already sent and you are waiting for the response. However they should be kept in a list to
       be retried later after a new accessToken.  
  
***/}

