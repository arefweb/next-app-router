import { HttpResponse } from "msw";

export function createMockCycle() {
  let counter = 0;
  return function mockCycle<T extends HttpResponse>(mocks: T[]) {
    const turn = counter % mocks.length;
    counter++;
    return mocks[turn];
  }
}