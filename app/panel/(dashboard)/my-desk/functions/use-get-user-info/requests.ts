import http, {HttpResponse} from "@/shared/services/http";

import {
  RawResponse, ResponseBody, TransformedResponseBody,
} from './types';

function transformResponse({
  data: {
    full_name,
    id,
    registration_date,
    phone_number,
    email
  }
}: HttpResponse<ResponseBody>): TransformedResponseBody {
  return {
    data: {
      fullName: full_name,
      email,
      id,
      phoneNumber: phone_number,
      registrationDate: (new Date(registration_date)).toLocaleDateString('en-US'),
    }
  }
}

export const getUserInfo = (): Promise<TransformedResponseBody> => {
  const url = '/user-info';

  return http.get<RawResponse>(
    url,
  ).then(transformResponse)
}