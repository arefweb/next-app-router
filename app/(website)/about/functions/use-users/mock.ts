import {http, HttpResponse} from "msw";
import {createMockCycle} from "@/shared/mock/utils";
import MOCK_KEYS from '@/shared/mock/mock-keys';

import {BASE_URL} from "@/shared/constants";
import {USERS_ENDPOINT} from "./constants";

const usersMockHandler = () => {
  const mockCycle = createMockCycle(MOCK_KEYS.USERS);

  return http.get(`${BASE_URL}${USERS_ENDPOINT}`, () => {
    return mockCycle([
      HttpResponse.json([{ first_name: "عباس", last_name: "معصومی" }]),
      HttpResponse.json([{ first_name: "عارف", last_name: "موحدزاده" }]),
      HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    ])
  });
}

export default usersMockHandler;