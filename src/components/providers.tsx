"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactLenis } from "lenis/react";
import { useState } from "react";
import { CartProvider } from "./CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactLenis root>
        <CartProvider>
          {children}
        </CartProvider>
      </ReactLenis>
    </QueryClientProvider>
  );
}
