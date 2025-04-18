This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Introduction
The goal of this project is to better be acquinted with Next.js App router mode and also practice
Mocking APIs with msw (Mock Service Worker) package.

Setting Up msw in Next.js had its own challenges that I am going to explain here.

## Next.js and MSW
Setting up mock service worker in Next.js has its own challenge because you have to set it 
for both server side (node.js) and client side (browser). Let's review each one:

### Server Integration
In order to mock API for node.js environment, first we need to setup the node server which you
can see in `./mock/node.js`. Then the important step is adding an `instrumentation.ts` file.

Instrumentation is a feature in next.js that enables observability and tracking capabilities.
for example if you want to monitor the performance or log errors etc. Here we use it to intercept our outgoing requests. You can find it in `./instrumentation.ts`.


### Browser Integration
Browser integration is a little bit more tricky. first you need to generate service worker file
with this command:

```bash
npx msw init <PUBLIC_DIR> --save
```

[Here](https://mswjs.io/docs/cli/init) you can find how it actually works.

Then you have to setup the browser worker, you can see how it is done in `./mock/browser.ts`

#### Conditionally enable mocking in the browser:
`./app/msw-provider.tsx` file shows you how the condition is applied. remember that 
you have to add `NEXT_PUBLIC_` prefix to the environment variable in order to enable it
for both server and client environments. This is the convention of Next.js.

But the tricky part is the `Suspense` boundary component and the `use` hook.

Before using them I constantly encountered this error: 
> Module not found: Package path ./browser is not exported from node_modules\msw\package.json.

The reason is that MSW version-2 has a ESM model export where it uses a package.json to export its inner
modules which is not compatible with Common-JS based server side execution environment of Next.js.
That's why you need to use React and Next.js's internal mechanisms to create a boundary between server and 
client code.

At first I used useEffect which I left the commented code for comparison. But that didn't work eventhough
I used 'use client' directive. But solution was `Suspense` component with `use` React API.
That's because useEffect is executed immediately and doesn't wait for the loading of msw/browser package.

Let's talk more about `Suspense` and `use` in React:

Suspense is a React component that can wait for a internal chaild that has a promise to be setteled and then
shows the result and during this time it shows a fallback component like loading. However Suspense needs `use` 
to work correctly.

`use` is a React API that lets you to read the value of a resource like a Promise or context.
In Next.js we may see this as a promise to be created in a parent server component and passed to a 
child "client component" as props. then the child component resolves the promise with `use` API.

example:
```javascript
import { fetchMessage } from './lib.js';
import { Message } from './message.js';

export default function App() {
  const messagePromise = fetchMessage();
  return (
    <Suspense fallback={<p>waiting for message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}
```

```javascript
// message.js
'use client';

import { use } from 'react';

export function Message({ messagePromise }) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}
```

As you can see the child component resolves the promise that is made in parent with `use`.

But you may ask why don't we just resolve the promise with await or .then() in the child component?
The answer is that because in that case the Suspense or even ErrorBoundary parent components don't receive
any signal whether promise has finished! `use` actually signals components like Suspense to show the fallback
or not. Suspense can't work without `use`.

Form the explanations above we understand that the mixture of `Suspense` and `use` in our client component that
is responsible for creating a waiting for our client side MSW code, does actually work because this is the way 
Next.js is created and understands.


##### Some Resources:

- [Next.js example of MSW](https://github.com/mswjs/examples/blob/with-next/examples/with-next/app/msw-provider.tsx)
- [Browser integration sample in MSW site](https://mswjs.io/docs/integrations/browser)


## Express.js Server
Here in this repository I have added an express.js server for my experiments and practice.
you can find it in this path: `./server`. By running `yarn devServer` in the project root, you can start the dev server of the express which contains some demo APIs. 
Alternativly you can run the dev server by cd to `./server` then run `yarn dev` there as well.

Express server is for demo and practice purposes and you can add routes to it as you wish.

