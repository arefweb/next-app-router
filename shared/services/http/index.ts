import axios, {
  AxiosRequestConfig,
} from "axios";
import { BASE_URL } from "@/shared/constants";

import {
  CustomAxiosError,
  AnyType,
  CustomAxiosResponse,
  CustomAxiosInstance,
  HttpResponse,
  CustomAxiosResult,
} from './types';
import { handleCommonErrors, enrichResponse } from './utils';

const http = axios.create({
  baseURL: BASE_URL,
}) as CustomAxiosInstance;
http.defaults.headers.common["Authorization"] = "Bearer TESTI";


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
    const cb = () => get<T, R>(url, error.config);
    return await handleCommonErrors(error, cb, retryAttempts);
  }
}

const originalDelete = http.delete;
async function del<T = AnyType, R = CustomAxiosResponse<T>, D = AnyType>(
  url: string,
  config?: AxiosRequestConfig<D>,
  retryAttempts?: number,
): Promise<R> {
  try {
    return await originalDelete<T, R>(url, config).then(r => enrichResponse(r as CustomAxiosResponse<T>) as R);
  } catch(err) {
    const error = err as CustomAxiosError<T>;
    const cb = () => del<T, R>(url, error.config);
    return await handleCommonErrors(error, cb, retryAttempts);
  }
}

const originalPost = http.post;
async function post<T = AnyType, R = CustomAxiosResponse<T>, D = AnyType>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
  retryAttempts?: number,
): Promise<R> {
  try {
    return await originalPost<T, R>(url, data, config).then(r => enrichResponse(r as CustomAxiosResponse<T>) as R);
  } catch(err) {
    const error = err as CustomAxiosError<T>;
    const cb = () => post<T, R>(url, data, error.config);
    return await handleCommonErrors(error, cb, retryAttempts);
  }
}

const originalPut = http.put;
async function put<T = AnyType, R = CustomAxiosResponse<T>, D = AnyType>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
  retryAttempts?: number,
): Promise<R> {
  try {
    return await originalPut<T, R>(url, data, config).then(r => enrichResponse(r as CustomAxiosResponse<T>) as R);
  } catch(err) {
    const error = err as CustomAxiosError<T>;
    const cb = () => put<T, R>(url, data, error.config);
    return await handleCommonErrors(error, cb, retryAttempts);
  }
}

http.get = get;
http.delete = del;
http.post = post;
http.put = put;

export type {
  CustomAxiosError,
  AnyType,
  CustomAxiosResponse,
  CustomAxiosInstance,
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

