import { http, HttpResponse } from 'msw';

import addressMockHandler from '@/app/(website)/about/functions/get-address/mock';
import usersMockHandler from '@/app/(website)/about/functions/use-users/mock';
import serverInfoMockHandler from '@/app/(website)/server-comp/functions/get-server-info/mock';

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
]