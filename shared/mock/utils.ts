import { HttpResponse } from "msw";
import { CLIENT_MOCK_KEY } from '@/shared/constants';

export function createMockCycle(clientMockKey?: string) {
  let counter = 0;
  if (typeof window !== 'undefined' && clientMockKey) {
    const CLIENT_MOCK = localStorage.getItem(CLIENT_MOCK_KEY);
    const mockObject = CLIENT_MOCK ? JSON.parse(CLIENT_MOCK) : null;
    counter = mockObject ? mockObject[clientMockKey] : 0;
  }
  return function mockCycle<T extends HttpResponse>(mocks: T[]) {
    const turn = counter % mocks.length;
    if (typeof window !== 'undefined' && clientMockKey) {
      const CLIENT_MOCK = localStorage.getItem(CLIENT_MOCK_KEY);
      const mockObject = CLIENT_MOCK ? JSON.parse(CLIENT_MOCK) : {};
      localStorage.setItem(CLIENT_MOCK_KEY, JSON.stringify({
        ...mockObject,
        [clientMockKey]: (counter + 1) % mocks.length,
      }));
    }
    counter += 1;
    return mocks[turn];
  }
}