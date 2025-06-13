"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";

interface Props {
  children: React.ReactNode;
}

function QueryProvider({ children }: Props) {
  /*
  * NOTE: The Reason we are creating the instance of the QueryClient with new keyword inside
  * a state is to ensure that data is not SHARED between different users and requests while still
  * only creating the queryClient once per component lifeCycle.
  * */
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default QueryProvider;