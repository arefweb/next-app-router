import { http, HttpResponse } from "msw";
import {createMockCycle} from "@/shared/mock/utils";
import MOCK_KEYS from '@/shared/mock/mock-keys';

const userInfoMockHandler = () => {
  const mockCycle = createMockCycle(MOCK_KEYS.USER_INFO);

  return http.get("http://localhost:5005/api/user-info", () => {
    return mockCycle([
      HttpResponse.json({
        full_name: 'Aref Movahed',
        id: 1,
        registration_date: "2025-08-10T18:12:53.522Z",
        email: 'arefmov@yahoo.com',
        phone_number: '09017475462',
      }),
    ])
  });
}

export default userInfoMockHandler;