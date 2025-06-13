import http, { HttpResponse } from "@/services/http";

import {
  ResponseBody,
  RawResponse,
  TransformedResponseBody,
} from './types';
import { USERS_ENDPOINT } from './constants';

function transformResponse({
  data,
 }: HttpResponse<ResponseBody>): TransformedResponseBody{
  return {
    entities: data.map((user) => ({
      firstName: user.first_name,
      lastName: user.last_name,
      fullName: `${user.first_name} ${user.last_name}`,
    })),
  };
}

export const getUsers = async (): Promise<TransformedResponseBody> => {
  return http.get<RawResponse[]>(
    USERS_ENDPOINT
  ).then(transformResponse);
}