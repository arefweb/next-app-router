import { http, HttpResponse, delay } from "msw";
import {createMockCycle} from "@/shared/mock/utils";
import MOCK_KEYS from '@/shared/mock/mock-keys';
import { BASE_URL } from "@/shared/constants";

import {CREATE_REFRESH_ENDPOINT} from "./constants";

const refreshTokenMockHandler = () => {
  const mockCycle = createMockCycle(MOCK_KEYS.REFRESH_TOKEN);

  return http.post(`${BASE_URL}${CREATE_REFRESH_ENDPOINT}`, async () => {
    await delay(1500);
    return mockCycle([
      HttpResponse.json({ data: 'created' }, { status: 201 }),
      HttpResponse.json({ message: 'Unauthorized' }, { status: 401 }),
    ])
  });
}

export default refreshTokenMockHandler;