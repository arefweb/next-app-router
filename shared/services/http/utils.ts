import {
  AnyType,
  CustomAxiosError,
  CustomAxiosResponse,
} from './types';
import { createRefreshToken } from "@/shared/functions/hooks/use-create-refresh-token/requests";

let count401 = 0;
let refreshResponse: string | null = null;

async function handleRefresh() {
  if (count401 === 0) {
    count401++;
    createRefreshToken().then(() => refreshResponse = 'success')
      .catch(() => refreshResponse = 'error');
  } else {
    count401++;
  }
  return new Promise((resolve, reject) => {
    const check = setInterval(() => {
      if (refreshResponse === 'success') {
        resolve('success');
        clearInterval(check);
      }
      if (refreshResponse === 'error') {
        reject('error');
        clearInterval(check);
      }
    }, 10);
  });
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
  if (error.status === 401 && error.config) {
    return new Promise((resolve) => {
      return handleRefresh().then(() => {
        return callMethod().then((res) => {
          count401--;
          if (count401 === 0) {
            refreshResponse = null;
          }
          resolve(res);
        });
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