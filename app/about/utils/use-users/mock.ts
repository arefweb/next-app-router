import {http, HttpResponse} from "msw";
import {createMockCycle} from "@/shared/mock/utils";

const usersMockHandler = () => {
  const mockCycle = createMockCycle();

  return http.get("http://localhost:5005/api/users", () => {
    return mockCycle([
      HttpResponse.json([{ first_name: "عباس", last_name: "معصومی" }]),
      HttpResponse.json([{ first_name: "عارف", last_name: "موحدزاده" }]),
    ])
  });
}

export default usersMockHandler;