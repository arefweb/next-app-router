import { http, HttpResponse } from 'msw';

import aboutMockHandler from '@/app/about/utils/get-about/mock';
import usersMockHandler from '@/app/about/utils/use-users/mock';

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
  aboutMockHandler(),
]