import http, { HttpResponse } from "@/shared/services/http";

import {
  TransformedResponseBody, ResponseBody, RawResponse,
} from './types';
import {PORTFOLIO_ENDPOINT} from "./constants";

function transformResponse({
  data,
}: HttpResponse<ResponseBody>): TransformedResponseBody {
  return {
    data: data.map(({
        asset,
        id,
        close_price,
        last_price,
        count,
      }) => ({
        asset,
        id,
        lastPrice: last_price,
        closePrice: close_price,
        count,
    })),
  };
}

export const getPortfolio = (): Promise<TransformedResponseBody> => {
  const url = PORTFOLIO_ENDPOINT;
  return http.get<RawResponse[]>(
    url,
  ).then(transformResponse);
}