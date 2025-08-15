import { http, HttpResponse } from 'msw';
import { createMockCycle } from "@/shared/mock/utils";
import {BASE_URL} from "@/shared/constants";
import {ADDRESS_ENDPOINT} from "./constants";

const addressMockHandler = () => {
  const mockCycle = createMockCycle();

  return http.get(`${BASE_URL}${ADDRESS_ENDPOINT}`, () => {
    return mockCycle([
      HttpResponse.json({ message: 'Bad Request' }, { status: 400 }),
      HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      HttpResponse.json({
        data: 'تهران خیابان ولیعصر مجتمع افق پلاک ۳۴۴۱ طبقه چهارم، شرکت مبنا'
      }),
      HttpResponse.json({
        data: 'تهران دروازه شمیران، خیابان سادات پلاک ۶۶'
      }),
      HttpResponse.json({
        data: 'بدون آدرس'
      })
    ]);
  });
}

export default addressMockHandler;