import { http, HttpResponse } from 'msw';

import aboutMockHandler from '@/app/about/utils/get-about/mock';

import todo from './data/todo.json';
import todos from './data/todos.json';


export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/todos/*", () =>
    HttpResponse.json(todo)
  ),
  http.get("https://jsonplaceholder.typicode.com/todos", () =>
    HttpResponse.json(todos)
  ),
  http.get("http://localhost:5005/api/users", () =>
    HttpResponse.json([{ first_name: "عباس", last_name: "معصومی" }])
  ),
  aboutMockHandler(),
]