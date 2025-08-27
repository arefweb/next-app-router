import axios, { AxiosResponse, AxiosError } from 'axios';
import { BASE_URL } from "@/shared/constants";
import { redirectToLogin } from "@/shared/functions/utils";

import {
  AnyType,
  CustomAxiosError,
  CustomAxiosResponse,
} from './types';

class RefreshToken {
  private count401: number;
  private refreshResponse: string | null = null;
  constructor() {
    this.count401 = 0;
  }
  increment401(): void {
    this.count401 += 1;
  }
  decrement401(): void {
    this.count401 -= 1;
  }
  getCount401(): number {
    return this.count401;
  }
  setRefreshResponse(resp: string | null): void {
    this.refreshResponse = resp;
  }
  getRefreshResponse(): string | null {
    return this.refreshResponse;
  }

  async handleRefresh() {
    let refreshResult: AxiosResponse;
    let refreshError: AxiosError;

    if (this.count401 === 0) {
      this.increment401();
      axios.post(
        '/auth/refresh',
        undefined,
        { baseURL: BASE_URL }
      ).then((r) => {
        this.setRefreshResponse('success');
        refreshResult = r;
      }).catch((e) => {
        this.setRefreshResponse('error');
        refreshError = e;
      });
    } else {
      this.increment401();
    }

    return new Promise((resolve, reject) => {
      const check = setInterval(() => {
        if (this.getRefreshResponse() === 'success') {
          clearInterval(check);
          resolve(refreshResult);
        }
        if (this.getRefreshResponse() === 'error') {
          clearInterval(check);
          reject(refreshError);
        }
      }, 10);
    });
  }
}

const refreshToken = new RefreshToken();

export async function handleCommonErrors<T = AnyType, R = CustomAxiosResponse<T>>
(error: CustomAxiosError<T>, callMethod: () => Promise<R>, retryAttempts?: number): Promise<R> {
  if (retryAttempts && error.config) {
    if (!error.config.retryNumber) {
      error.config.retryNumber = 1;
    }
    if (error && error.config.retryNumber <= retryAttempts) {
      try {
        return await callMethod();
      } catch {
        error.config.retryNumber += 1;
      }
    }
  }
  if (error.status === 401 && error.config && !error.config.noAuth) {
    return new Promise((resolve, reject) => {
      refreshToken.handleRefresh().then(() => callMethod().then((res) => {
          refreshToken.decrement401();
          if (refreshToken.getCount401() === 0) {
            refreshToken.setRefreshResponse(null);
          }
          resolve(res);
        })).catch((e) => {
          redirectToLogin();
          reject(e);
      });
    });
  }
  const enrichedError = {
    ...error.toJSON?.() ?? {},
    ok: false,
    status: error.status,
    message: error.message,
  };
  return Promise.reject(enrichedError);
}


export function enrichResponse<T, D>(response: CustomAxiosResponse<T, D>) {
  const {status} = response;
  const ok = (status >= 200 && status < 300);
  if (status && (status >= 200 && status < 300)) {
    response.ok = true;
  }
  return {
    ...response,
    ok,
  };
}