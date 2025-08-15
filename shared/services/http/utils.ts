import {
  AnyType,
  CustomAxiosError,
  CustomAxiosResponse,
} from './types';
import { createRefreshToken } from "@/shared/functions/hooks/use-create-refresh-token/requests";

let count401 = 0;
let refreshResponse: string | null = null;

async function handleRefresh() {
  let refreshResult: CustomAxiosResponse;
  let refreshError: CustomAxiosError;
  if (count401 === 0) {
    count401++;
    createRefreshToken().then((r) => {
      refreshResponse = 'success';
      refreshResult = r;
    }).catch((e) => {
        refreshResponse = 'error';
        refreshError = e;
      });
  } else {
    count401++;
  }
  return new Promise((resolve, reject) => {
    const check = setInterval(() => {
      if (refreshResponse === 'success') {
        clearInterval(check);
        resolve(refreshResult);
      }
      if (refreshResponse === 'error') {
        clearInterval(check);
        reject(refreshError);
      }
    }, 10);
  });
}

export function redirectToLogin() {
  if (typeof window === "undefined") return;
  const currentUrl = window.location.pathname + window.location.search;
  const redirectParam   = encodeURIComponent(currentUrl);
  window.location.replace(`/panel/login?redirect=${redirectParam}`);
}

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
      return handleRefresh().then(() => {
        return callMethod().then((res) => {
          count401--;
          if (count401 === 0) {
            refreshResponse = null;
          }
          resolve(res);
        });
      }).catch((e) => {
        redirectToLogin();
        reject(e);
      })
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