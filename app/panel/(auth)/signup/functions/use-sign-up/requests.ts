import http from "@/shared/services/http";
import { FormInputTypes } from './types';

export const signUp = (data: FormInputTypes) => {
  const url = '/auth/signup';
  return http.post(
    url,
    data,
    { noAuth: true }
  );
}