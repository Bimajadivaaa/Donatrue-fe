"use client"

import { env } from "@/env"
import { getDefaultConfig } from "connectkit"
import { del, get, set } from "idb-keyval"
import { type Chain } from "viem"
import { http, createConfig, createStorage } from "wagmi"

const bitfinity = {
  id: 355113,
  name: "Bitfinity",
  nativeCurrency: {
    name: "BFT",
    symbol: "BFT",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://testnet.bitfinity.network"] },
    public: { http: ["https://testnet.bitfinity.network"] }
  },
  blockExplorers: {
    default: {
      name: "Bitfinity Explorer",
      url: "https://explorer.testnet.bitfinity.network/"
    }
  }
} as const satisfies Chain

export const config = createConfig(
  getDefaultConfig({
    storage: createStorage({
      storage: {
        async getItem(name) {
          return get(name)
        },
        async setItem(name, value) {
          await set(name, value)
        },
        async removeItem(name) {
          await del(name)
        }
      }
    }),
    chains: [bitfinity],
    transports: {
      [bitfinity.id]: http("https://testnet.bitfinity.network")
    },

    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: "Donatrue",
    appDescription: "Donatrue is decentralized donation system",
    appUrl: "https://donatrue.lichtlabs.org",
    appIcon: "https://i.ibb.co.com/0jtM4Lj/donatrue.png"
  })
)
