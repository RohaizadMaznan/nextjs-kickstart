"use client"; // [Q1] Providers use React context, so this must be a Client Component.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // [Q2] Create the QueryClient ONCE per browser session.
  //      useState(() => ...) stops a new client (and an empty cache) on every render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // [Q3] Data counts as "fresh" for 60s: no refetch in that window.
            retry: 1, //             [Q4] Retry a failed request once before showing the error.
          },
        },
      }),
  );

  // [Q5] Every component below can now call useQuery / useMutation.
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
