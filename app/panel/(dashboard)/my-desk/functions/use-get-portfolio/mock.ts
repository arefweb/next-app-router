import { http, HttpResponse } from "msw";
import {createMockCycle} from "@/shared/mock/utils";
import MOCK_KEYS from '@/shared/mock/mock-keys';
import {BASE_URL} from "@/shared/constants";

import { RawResponse } from './types';
import {PORTFOLIO_ENDPOINT} from "./constants";

const portfolioMockHandler = () => {
  const mockCycle = createMockCycle(MOCK_KEYS.PORTFOLIO);

  return http.get(`${BASE_URL}${PORTFOLIO_ENDPOINT}`, () => mockCycle([
      HttpResponse.json({ message: 'Unauthorized' }, { status: 401 }),
      HttpResponse.json<RawResponse[]>([
        {
          asset: 'BTX',
          id: 4,
          last_price: 234,
          count: 12,
          close_price: 234,
        }
      ]),
    ]));
}

export default portfolioMockHandler;