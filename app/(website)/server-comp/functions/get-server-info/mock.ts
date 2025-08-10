import { http, HttpResponse } from 'msw';
import { createMockCycle } from "@/shared/mock/utils";

const serverInfoMockHandler = () => {
  const mockCycle = createMockCycle();

  return http.get("http://localhost:5005/api/server-info", () => {
    return mockCycle([
      HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      HttpResponse.json({
        data: 'Server Components are able to fetch data independently.'
      }),
      HttpResponse.json({
        data: 'Server Components can also face API errors. Have you thought about it?'
      }),
    ]);
  });
}

export default serverInfoMockHandler;