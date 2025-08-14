import { http, HttpResponse } from "msw";
import {createMockCycle} from "@/shared/mock/utils";
import MOCK_KEYS from '@/shared/mock/mock-keys';

import { RawResponse } from './types';

const portfolioMockHandler = () => {
  const mockCycle = createMockCycle(MOCK_KEYS.PORTFOLIO);

  return http.get("http://localhost:5005/api/portfolio", () => {
    return mockCycle([
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
    ])
  });
}

export default portfolioMockHandler;