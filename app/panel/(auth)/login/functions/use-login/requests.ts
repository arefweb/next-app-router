import http, {HttpResponse} from "@/shared/services/http";
import { FormInputTypes, ResponseBody, RawResponse } from './types';

function transformResponse({
  data: {
    id,
    name,
    email,
    createdAt,
    updatedAt,
  }
}: HttpResponse<ResponseBody>): RawResponse {
  return {
    id,
    name,
    email,
    createdAt,
    updatedAt,
  }
}

export const login = (data: FormInputTypes): Promise<RawResponse> => {
  const url = '/auth/login';

  return http.post<RawResponse, HttpResponse<RawResponse>, FormInputTypes>(
    url,
    data,
    { noAuth: true }
  ).then(transformResponse)
}