import { http, HttpResponse } from 'msw';

import addressMockHandler from '@/app/(website)/about/functions/get-address/mock';
import usersMockHandler from '@/app/(website)/about/functions/use-users/mock';
import serverInfoMockHandler from '@/app/(website)/server-comp/functions/get-server-info/mock';
import userInfoMockHandler from "@/app/panel/(dashboard)/my-desk/functions/use-get-user-info/mock";
import portfolioMockHandler from "@/app/panel/(dashboard)/my-desk/functions/use-get-portfolio/mock";
import refreshTokenMockHandler from "@/shared/functions/hooks/use-create-refresh-token/mock";

import todo from './data/todo.json';
import todos from './data/todos.json';

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/todos/*", () =>
    HttpResponse.json(todo)
  ),
  http.get("https://jsonplaceholder.typicode.com/todos", () =>
    HttpResponse.json(todos)
  ),
  usersMockHandler(),
  addressMockHandler(),
  serverInfoMockHandler(),
  userInfoMockHandler(),
  portfolioMockHandler(),
  refreshTokenMockHandler(),
]