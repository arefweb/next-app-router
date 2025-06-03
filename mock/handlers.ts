import { http, HttpResponse } from 'msw';

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
    HttpResponse.json([{ first_name: "عارف", last_name: "موحدزاده" }])
  ),
  http.get("http://localhost:5005/api/address", () =>
    HttpResponse.json({ data: 'تهران خیابان ولیعصر مجتمع افق پلاک ۳۴۴۱ طبقه چهارم، شرکت مبنا' })
  ),
];