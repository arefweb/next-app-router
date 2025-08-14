import { http, HttpResponse, delay } from "msw";
import {createMockCycle} from "@/shared/mock/utils";
import MOCK_KEYS from '@/shared/mock/mock-keys';

const refreshTokenMockHandler = () => {
  const mockCycle = createMockCycle(MOCK_KEYS.REFRESH_TOKEN);

  return http.post("http://localhost:5005/api/token/refresh", async () => {
    await delay(3000);
    return mockCycle([
      HttpResponse.json({ data: 'created' }, { status: 201 }),
    ])
  });
}

export default refreshTokenMockHandler;