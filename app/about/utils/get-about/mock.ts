import { http, HttpResponse } from 'msw';
import { createMockCycle } from "@/mock/utils";

const aboutMockHandler = () => {
  const mockCycle = createMockCycle();

  return http.get("http://localhost:5005/api/address", () => {
    return mockCycle([
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

export default aboutMockHandler;