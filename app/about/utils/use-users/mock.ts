import {http, HttpResponse} from "msw";
import {createMockCycle} from "@/shared/mock/utils";
import MOCK_KEYS from '@/shared/mock/mock-keys';

const usersMockHandler = () => {
  const mockCycle = createMockCycle(MOCK_KEYS.USERS);

  return http.get("http://localhost:5005/api/users", () => {
    return mockCycle([
      HttpResponse.json([{ first_name: "عباس", last_name: "معصومی" }]),
      HttpResponse.json([{ first_name: "عارف", last_name: "موحدزاده" }]),
      HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
    ])
  });
}

export default usersMockHandler;