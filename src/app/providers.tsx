"use client"

import { config } from "@/config/wagmi"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ConnectKitProvider } from "connectkit"
import { WagmiProvider } from "wagmi"

import { TransactionProvider } from "@/lib/context/transaction-context"
import { getQueryClient } from "@/lib/get-query-client"

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <TransactionProvider>
            {children}
            <ReactQueryDevtools />
          </TransactionProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
