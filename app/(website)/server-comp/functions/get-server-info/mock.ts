import { http, HttpResponse } from 'msw';
import { createMockCycle } from "@/shared/mock/utils";
import {BASE_URL} from "@/shared/constants";
import {SERVER_INFO_ENDPOINT} from "./constants";

const serverInfoMockHandler = () => {
  const mockCycle = createMockCycle();

  return http.get(`${BASE_URL}${SERVER_INFO_ENDPOINT}`, () => mockCycle([
      HttpResponse.json({
        data: 'Server Components are able to fetch data independently.'
      }),
      HttpResponse.json({
        data: 'Server Components can also face API errors. Have you thought about it?'
      }),
      HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
    ]));
}

export default serverInfoMockHandler;