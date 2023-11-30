"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { createTRPCReact } from "@trpc/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { type AppRouter } from "@/server/api/root";
import { getUrl, transformer } from "@/trpc/shared";

type Props = {
  children: React.ReactNode;
  cookies: string;
};

export const api = createTRPCReact<AppRouter>();

function Providers({ children, cookies }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: process.env.NODE_ENV !== "development",
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            return {
              cookie: cookies,
              "x-trpc-source": "react",
            };
          },
        }),
      ],
    }),
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <api.Provider client={trpcClient} queryClient={queryClient}>
          {children}
        </api.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default Providers;
