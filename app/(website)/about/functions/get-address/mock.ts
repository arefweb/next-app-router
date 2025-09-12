import { http, HttpResponse } from 'msw';
import { createMockCycle } from "@/shared/mock/utils";
import {BASE_URL} from "@/shared/constants";
import {ADDRESS_ENDPOINT} from "./constants";

const addressMockHandler = () => {
  const mockCycle = createMockCycle();

  return http.get(`${BASE_URL}${ADDRESS_ENDPOINT}`, () => mockCycle([
      HttpResponse.json({
        data: '9 Devonshire Square, London EC2M 4YF'
      }),
      HttpResponse.json({ message: 'Bad Request' }, { status: 400 }),
      HttpResponse.json({
        data: '33 W 23 St, New York, NY 10010, United States'
      }),
      HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      HttpResponse.json({
        data: '760 Market Street, Floor 10, San Francisco, CA, United States'
      })
    ]));
}

export default addressMockHandler;