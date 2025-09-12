import {http, HttpResponse} from "msw";
import {createMockCycle} from "@/shared/mock/utils";
import MOCK_KEYS from '@/shared/mock/mock-keys';

import {BASE_URL} from "@/shared/constants";
import {USERS_ENDPOINT} from "./constants";

const usersMockHandler = () => {
  const mockCycle = createMockCycle(MOCK_KEYS.USERS);

  return http.get(`${BASE_URL}${USERS_ENDPOINT}`, () => mockCycle([
      HttpResponse.json([
        { first_name: "Mark", last_name: "Twain" },
        { first_name: "Thomas", last_name: "Edison" },
        { first_name: "Michael", last_name: "Jackson" }
      ]),
      HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    ]));
}

export default usersMockHandler;